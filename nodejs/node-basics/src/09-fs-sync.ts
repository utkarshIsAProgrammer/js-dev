import path from "node:path";
import fs from "node:fs";

const DEMO_FOLDER_PATH = path.join(process.cwd(), "file-system", "fs-demo");

const SYNC_FILE_PATH = path.join(DEMO_FOLDER_PATH, "sync-text.txt");

type FileResult = {
  style: string;
  fileName: string;
  content: string;
  sizeInBytes: number;
};

function syncApi(): FileResult {
  fs.mkdirSync(DEMO_FOLDER_PATH, { recursive: true });

  const fd = fs.openSync(SYNC_FILE_PATH, "w");

  try {
    fs.writeSync(fd, "Hello, sync file system!", null, "utf-8");
  } finally {
    fs.closeSync(fd);
  }

  fs.appendFileSync(SYNC_FILE_PATH, "\nAppend using sync API!", "utf-8");

  const content = fs.readFileSync(SYNC_FILE_PATH, "utf-8");
  const stats = fs.statSync(SYNC_FILE_PATH);

  return {
    style: "sync",
    fileName: path.basename(SYNC_FILE_PATH),
    content,
    sizeInBytes: stats.size,
  };
}

console.log("Sync result:", syncApi());
