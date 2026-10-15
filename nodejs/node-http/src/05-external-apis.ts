import http, { IncomingMessage, ServerResponse } from "node:http";

type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
};

const PORT = 5000;

const server = http.createServer(
  async (req: IncomingMessage, res: ServerResponse) => {
    const method = req.method ?? "GET";

    const requestUrl = new URL(
      req.url ?? "/",
      `http://${req.headers.host ?? "localhost"}`,
    );

    const pathName = requestUrl.pathname;

    res.setHeader("Content-Type", "application/json");

    // GET /posts
    if (method === "GET" && pathName === "/posts") {
      try {
        // call external API
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts",
        );

        if (!response.ok) {
          throw new Error(`External API error: ${response.status}`);
        }

        // convert JSON response to JavaScript data
        const posts = (await response.json()) as Post[];

        const result: ApiResponse<Post[]> = {
          success: true,
          message: "Posts fetched successfully",
          data: posts,
        };

        res.statusCode = 200;
        res.end(JSON.stringify(result));
      } catch (error) {
        console.error(error);

        const result: ApiResponse<never> = {
          success: false,
          message: "Failed to fetch posts",
          error: "External API request failed",
        };

        res.statusCode = 500;
        res.end(JSON.stringify(result));
      }

      return;
    }

    // GET /posts/:id
    if (method === "GET" && pathName.startsWith("/posts/")) {
      const id = pathName.split("/")[2];

      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}`,
        );

        if (!response.ok) {
          res.statusCode = response.status;

          const result: ApiResponse<never> = {
            success: false,
            message: "Post not found",
          };

          res.end(JSON.stringify(result));
          return;
        }

        const post = (await response.json()) as Post;

        const result: ApiResponse<Post> = {
          success: true,
          message: "Post fetched successfully",
          data: post,
        };

        res.statusCode = 200;
        res.end(JSON.stringify(result));
      } catch (error) {
        console.error(error);

        const result: ApiResponse<never> = {
          success: false,
          message: "Failed to fetch post",
          error: "External API request failed",
        };

        res.statusCode = 500;
        res.end(JSON.stringify(result));
      }

      return;
    }

    res.statusCode = 404;

    const result: ApiResponse<never> = {
      success: false,
      message: "Route not found",
    };

    res.end(JSON.stringify(result));
  },
);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
