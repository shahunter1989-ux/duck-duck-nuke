import { cp, mkdir, writeFile } from "node:fs/promises";
const root = new URL("../", import.meta.url),
  out = new URL("../dist/", import.meta.url);
await mkdir(out, { recursive: true });
for (const path of ["index.html", "src", "assets/optimized", "assets/fonts"])
  await cp(new URL(path, root), new URL(path, out), { recursive: true });
for (const path of ["assets/worlds", "assets/polished", "assets/animation"])
  await cp(new URL(path, root), new URL(path, out), { recursive: true, filter: path => !path.endsWith('.png') });
await writeFile(new URL(".nojekyll", out), "");
console.log("Static site built in dist/");
