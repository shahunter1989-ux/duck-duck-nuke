import { LOCAL_PREVIEW } from "./release.js";
import { firebaseConfig } from "./firebase-config.js";
let connection;
const VERSION = "10.12.4";
export const cleanCallsign = (s) =>
  String(s)
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 10);
// Separate boards: v2 uses fair fixed-world physics and a revised fuel economy.
export const boardKey = (mode, date = new Date()) =>
  `duck-duck-nuke-v2-${mode === "hard" ? "hard" : "easy"}-${date.toISOString().slice(0, 10)}`;
async function connect() {
  connection ??= Promise.all([
    import(`https://www.gstatic.com/firebasejs/${VERSION}/firebase-app.js`),
    import(
      `https://www.gstatic.com/firebasejs/${VERSION}/firebase-firestore.js`
    ),
  ])
    .then(([app, api]) => ({
      api,
      db: api.getFirestore(app.initializeApp(firebaseConfig)),
    }))
    .catch((e) => {
      connection = null;
      throw e;
    });
  return connection;
}
export function withTimeout(promise, ms = 10000) {
  let timer;
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      timer = setTimeout(() => reject(new Error("Connection timed out")), ms);
    }),
  ]).finally(() => clearTimeout(timer));
}
export async function readBoard(mode) {
  if (LOCAL_PREVIEW) return [];
  return withTimeout(
    (async () => {
      const { api, db } = await connect();
      const snapshot = await api.getDocs(
        api.query(
          api.collection(db, "leaderboards", boardKey(mode), "scores"),
          api.orderBy("score", "desc"),
          api.limit(100),
        ),
      );
      const unique = new Map();
      for (const doc of snapshot.docs) {
        const row = doc.data(),
          initials = cleanCallsign(row.initials);
        if (!initials || !Number.isFinite(row.score) || row.score < 0) continue;
        if (!unique.has(initials))
          unique.set(initials, {
            initials,
            score: Math.floor(row.score),
            pilot: String(row.characterName || "").slice(0, 60),
          });
      }
      return [...unique.values()].slice(0, 5);
    })(),
  );
}
export async function postScore(run, pilot, initials, submissionId) {
  if (LOCAL_PREVIEW) throw new Error("Public posting is disabled in this local preview.");
  const { api, db } = await withTimeout(connect());
  // Stable per-run ID makes a retry after an uncertain network response non-duplicating.
  const ref = api.doc(db, "leaderboards", run.boardKey, "scores", submissionId);
  try {
    await withTimeout(
      api.setDoc(ref, {
        initials: cleanCallsign(initials),
        score: Math.max(0, Math.floor(run.score)),
        characterId: pilot.id,
        characterName: pilot.name,
        createdAt: api.serverTimestamp(),
      }),
    );
  } catch (error) {
    const existing = await withTimeout(api.getDoc(ref)).catch(() => null);
    if (!existing?.exists()) throw error;
  }
}
