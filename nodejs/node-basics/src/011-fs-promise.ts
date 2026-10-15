import path from "node:path";
import fs from "node:fs/promises";

const DEMO_FOLDER_PATH = path.join(process.cwd(), "file-system", "fs-demo");

const PROMISE_FILE_PATH = path.join(DEMO_FOLDER_PATH, "promise-text.txt");

type FileResult = {
  style: string;
  fileName: string;
  content: string;
  sizeInBytes: number;
};

async function promiseApi(): Promise<FileResult> {
  await fs.mkdir(DEMO_FOLDER_PATH, { recursive: true });

  await fs.writeFile(PROMISE_FILE_PATH, "Hello, promise file system!", "utf-8");

  await fs.appendFile(
    PROMISE_FILE_PATH,
    "\nAppend using promise API!",
    "utf-8",
  );

  const content = await fs.readFile(PROMISE_FILE_PATH, "utf-8");
  const stats = await fs.stat(PROMISE_FILE_PATH);

  return {
    style: "promise",
    fileName: path.basename(PROMISE_FILE_PATH),
    content,
    sizeInBytes: stats.size,
  };
}

async function main(): Promise<void> {
  try {
    const result = await promiseApi();
    console.log("Promise result:", result);
  } catch (err) {
    console.error("Promise error:", err);
  }
}

main();
