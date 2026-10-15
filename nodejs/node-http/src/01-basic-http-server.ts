import http, { type IncomingMessage, type ServerResponse } from "node:http";

const PORT = 5000;

// creating a server
const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    const method = req.method;
    const url = req.url;
    const userAegnt = req.headers["user-agent"];
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end(`Basic node http server: ${method} ${url} ${userAegnt}`);
  },
);

server.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
