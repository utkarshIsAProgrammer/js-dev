import http, { IncomingMessage, ServerResponse } from "node:http";

type CreateUserBody = {
  name?: string;
  email?: string;
};

const PORT = 5000;

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    const method = req.method ?? "GET";
    const requestUrl = new URL(
      req.url ?? "/",
      `http://${req.headers.host ?? "localhost"}`,
    );
    const pathName = requestUrl.pathname;

    res.setHeader("Content-Type", "text/plain");

    if (method === "POST" && pathName === "/users") {
      const chunks: Buffer[] = [];

      req.on("data", (chunk: Buffer) => {
        chunks.push(chunk);
      });

      req.on("end", () => {
        const rawBody = Buffer.concat(chunks).toString("utf-8");

        if (!rawBody) {
          res.statusCode = 400;
          res.end("Body is required!");
          return;
        }

        try {
          const body = JSON.parse(rawBody) as CreateUserBody;

          if (!body.name || !body.email) {
            res.statusCode = 400;
            res.end("Name and email are required!");
            return;
          }

          res.statusCode = 201;
          res.end(
            `User created with name ${body.name} and email ${body.email}`,
          );
        } catch {
          res.statusCode = 400;
          res.end("Invalid JSON body!");
        }
      });

      req.on("error", () => {
        if (!res.writableEnded) {
          res.statusCode = 400;
          res.end("Error reading request body!");
        }
      });

      return;
    }

    res.statusCode = 404;
    res.end("Route not found!");
  },
);

server.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
