import { createApp } from "./app.ts";
import { env } from "./config/env.ts";
import { logger } from "./lib/logger.ts";

const app = createApp();
const port = env.port;

app.listen(port, () => {
  logger.info(`Server is running on PORT: ${port}`);
});
