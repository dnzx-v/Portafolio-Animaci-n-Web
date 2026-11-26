const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const port = 4174;
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".mp4": "video/mp4",
  ".png": "image/png"
};

http.createServer((request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { Allow: "GET, HEAD" });
    response.end();
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  } catch {
    response.writeHead(400);
    response.end("Invalid URL");
    return;
  }

  if (pathname === "/") pathname = "/index.html";
  const file = path.resolve(root, "." + pathname);
  if (!file.startsWith(root + path.sep)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.stat(file, (error, stats) => {
    if (error || !stats.isFile()) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }

    let start = 0;
    let end = stats.size - 1;
    let status = 200;
    const range = request.headers.range;
    if (range) {
      const match = /^bytes=(\d*)-(\d*)$/.exec(range);
      if (!match) {
        response.writeHead(416, { "Content-Range": `bytes */${stats.size}` });
        response.end();
        return;
      }

      if (match[1]) {
        start = Number(match[1]);
        if (match[2]) end = Math.min(Number(match[2]), stats.size - 1);
      } else if (match[2]) {
        start = Math.max(stats.size - Number(match[2]), 0);
      }

      if (start > end || start >= stats.size) {
        response.writeHead(416, { "Content-Range": `bytes */${stats.size}` });
        response.end();
        return;
      }
      status = 206;
    }

    const headers = {
      "Accept-Ranges": "bytes",
      "Content-Length": end - start + 1,
      "Content-Type": contentTypes[path.extname(file).toLowerCase()] || "application/octet-stream"
    };
    if (status === 206) headers["Content-Range"] = `bytes ${start}-${end}/${stats.size}`;
    response.writeHead(status, headers);
    if (request.method === "HEAD") {
      response.end();
      return;
    }
    fs.createReadStream(file, { start, end }).pipe(response);
  });
}).listen(port, "127.0.0.1", () => {
  console.log(`Portafolio disponible en http://127.0.0.1:${port}/`);
});
