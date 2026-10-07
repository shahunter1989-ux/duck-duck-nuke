const KEY = "duck-duck-nuke-v2";
export const defaults = {
  pilot: "ducky",
  mode: "easy",
  sound: true,
  motion: true,
  best: { easy: 0, hard: 0 },
  runs: 0,
  totalCaps: 0,
  initials: "",
};
export function loadSave() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || "{}");
    return {
      ...defaults,
      pilot: typeof raw.pilot === "string" ? raw.pilot : defaults.pilot,
      mode: raw.mode === "hard" ? "hard" : "easy",
      sound: raw.sound !== false,
      motion: raw.motion !== false,
      best: {
        easy: safeNumber(raw.best?.easy),
        hard: safeNumber(raw.best?.hard),
      },
      runs: safeNumber(raw.runs),
      totalCaps: safeNumber(raw.totalCaps),
      initials:
        typeof raw.initials === "string" ? raw.initials.slice(0, 10) : "",
    };
  } catch {
    return { ...defaults, best: { ...defaults.best } };
  }
}
function safeNumber(n) {
  return Number.isFinite(n) && n >= 0 ? Math.floor(n) : 0;
}
export function writeSave(save) {
  try {
    localStorage.setItem(KEY, JSON.stringify(save));
    return true;
  } catch {
    return false;
  }
}
