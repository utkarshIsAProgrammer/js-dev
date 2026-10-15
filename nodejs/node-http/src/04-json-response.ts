import http, { IncomingMessage, ServerResponse } from "node:http";

type User = {
  id: number;
  name: string;
  email: string;
};

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
};

type CreateUserBody = {
  name: string;
  email: string;
};

const users: User[] = [
  {
    id: 1,
    name: "indiedev",
    email: "indiedev@email.com",
  },
  {
    id: 2,
    name: "jane doe",
    email: "jane@email.com",
  },
];

const PORT = 5000;

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    const method = req.method ?? "GET";
    const requestUrl = new URL(
      req.url ?? "/",
      `http://${req.headers.host ?? "localhost"}`,
    );
    const pathName = requestUrl.pathname;

    res.setHeader("Content-Type", "application/json");

    // GET /users
    if (method === "GET" && pathName === "/users") {
      const response: ApiResponse<User[]> = {
        success: true,
        message: "Users fetched successfully",
        data: users,
      };

      res.statusCode = 200;
      res.end(JSON.stringify(response));
      return;
    }

    // POST /users
    if (method === "POST" && pathName === "/users") {
      const chunks: Buffer[] = [];

      req.on("data", (chunk: Buffer) => {
        chunks.push(chunk);
      });

      req.on("end", () => {
        const rawBody = Buffer.concat(chunks).toString("utf-8");

        if (!rawBody) {
          res.statusCode = 400;
          const response: ApiResponse<never> = {
            success: false,
            message: "Request body is required",
            error: "Empty request body",
          };
          res.end(JSON.stringify(response));
          return;
        }

        try {
          const body: unknown = JSON.parse(rawBody);

          if (
            typeof body !== "object" ||
            body === null ||
            !("name" in body) ||
            !("email" in body) ||
            typeof body.name !== "string" ||
            typeof body.email !== "string" ||
            !body.name.trim() ||
            !body.email.trim()
          ) {
            res.statusCode = 400;
            const response: ApiResponse<never> = {
              success: false,
              message: "Name and email are required",
            };
            res.end(JSON.stringify(response));
            return;
          }

          const newUser: User = {
            id: users.length
              ? Math.max(...users.map((user) => user.id)) + 1
              : 1,
            name: body.name.trim(),
            email: body.email.trim(),
          };

          users.push(newUser);

          const response: ApiResponse<User> = {
            success: true,
            message: "User created successfully",
            data: newUser,
          };

          res.statusCode = 201;
          res.end(JSON.stringify(response));
        } catch {
          res.statusCode = 400;

          const response: ApiResponse<never> = {
            success: false,
            message: "Invalid JSON body",
            error: "Please send valid JSON",
          };

          res.end(JSON.stringify(response));
        }
      });

      return;
    }

    // unknown route
    res.statusCode = 404;

    const response: ApiResponse<never> = {
      success: false,
      message: "Route not found",
    };

    res.end(JSON.stringify(response));
  },
);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
