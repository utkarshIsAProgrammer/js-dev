import path from "node:path";
import fs from "node:fs";

const DEMO_FOLDER_PATH = path.join(process.cwd(), "file-system", "fs-demo");

const CALLBACK_FILE_PATH = path.join(DEMO_FOLDER_PATH, "callback-text.txt");

type FileResult = {
  style: string;
  fileName: string;
  content: string;
  sizeInBytes: number;
};

function callbackApi(
  callback: (err: NodeJS.ErrnoException | null, result?: FileResult) => void,
): void {
  fs.mkdir(DEMO_FOLDER_PATH, { recursive: true }, (mkdirErr) => {
    if (mkdirErr) return callback(mkdirErr);

    fs.writeFile(
      CALLBACK_FILE_PATH,
      "Hello, callback file system!",
      "utf-8",
      (writeErr) => {
        if (writeErr) return callback(writeErr);

        fs.appendFile(
          CALLBACK_FILE_PATH,
          "\nAppend using callback API!",
          "utf-8",
          (appendErr) => {
            if (appendErr) return callback(appendErr);

            fs.readFile(CALLBACK_FILE_PATH, "utf-8", (readErr, content) => {
              if (readErr) return callback(readErr);

              fs.stat(CALLBACK_FILE_PATH, (statErr, stats) => {
                if (statErr) return callback(statErr);

                callback(null, {
                  style: "callback",
                  fileName: path.basename(CALLBACK_FILE_PATH),
                  content,
                  sizeInBytes: stats.size,
                });
              });
            });
          },
        );
      },
    );
  });
}

callbackApi((err, result) => {
  if (err) {
    console.error("Callback error:", err.message);
    return;
  }

  console.log("Callback result:", result);
});
