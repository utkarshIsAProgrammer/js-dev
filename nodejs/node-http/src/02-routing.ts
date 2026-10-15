import http, { IncomingMessage, ServerResponse } from "node:http";

const PORT = 5000;

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    const method = req.method ?? "GET";
    const url = new URL(req.url ?? "/", `http:${req.headers.host}`);
    const pathName = url.pathname;

    res.setHeader("Content-Type", "text/plain");

    if (method === "GET" && pathName === "/health") {
      res.statusCode = 200;
      res.end("Server is healthy!");
      return;
    }

    if (method === "GET" && pathName === "/posts") {
      res.statusCode = 200;
      res.end("Posts list!");
      return;
    }

    if (method === "GET" && pathName === "/users") {
      res.statusCode = 200;
      res.end("Users list!");
      return;
    }

    res.statusCode = 404;
    res.end("Route not found!");
  },
);

server.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
