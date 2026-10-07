import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
const root = process.cwd(),
  port = Number(process.env.PORT || 4187);
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".webp": "image/webp",
  ".png": "image/png",
  ".json": "application/json",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
};
createServer(async (req, res) => {
  try {
    let pathname = decodeURIComponent(
      new URL(req.url, "http://localhost").pathname,
    );
    if (pathname.startsWith("/duck-duck-nuke/"))
      pathname = pathname.slice("/duck-duck-nuke".length);
    const path = resolve(
      root,
      "." + (pathname.endsWith("/") ? pathname + "index.html" : pathname),
    );
    if (path !== root && !path.startsWith(root + sep)) {
      res.writeHead(403);
      return res.end();
    }
    if (pathname.split("/").some((p) => p.startsWith("."))) {
      res.writeHead(403);
      return res.end();
    }
    if (!(await stat(path)).isFile()) throw new Error("Not a file");
    res.writeHead(200, {
      "Content-Type": types[extname(path)] || "application/octet-stream",
      "Cache-Control": "no-store",
    });
    res.end(await readFile(path));
  } catch {
    res.writeHead(404);
    res.end("Not found");
  }
}).listen(port, "127.0.0.1", () =>
  console.log(`Duck Duck Nuke: http://127.0.0.1:${port}`),
);
