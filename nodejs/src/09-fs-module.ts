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
  // create the parent directory if it doesn't exist
  fs.mkdirSync(DEMO_FOLDER_PATH, { recursive: true });

  // open the file and get a numeric file descriptor
  const fd = fs.openSync(SYNC_FILE_PATH, "w");

  try {
    fs.writeSync(fd, "Hello, sync file system!", "utf-8"); // write to file
  } finally {
    fs.closeSync(fd);
  }

  fs.appendFileSync(SYNC_FILE_PATH, "\nAppend using file sync!", "utf-8"); // append to file

  const content = fs.readFileSync(SYNC_FILE_PATH, "utf-8");
  const stats = fs.statSync(SYNC_FILE_PATH);

  return {
    style: "sync",
    content,
    fileName: path.basename(SYNC_FILE_PATH),
    sizeInBytes: stats.size,
  };
}
syncApi();
