import { Readable, Transform, Writable } from "node:stream";

const readableStream = Readable.from([
  "nodejs",
  "bun",
  "pnpm",
  "hono",
  "elysia",
  "nestjs",
]);

const transformUpper = new Transform({
  // Transform each incoming chunk
  transform(chunk, encoding, callback) {
    const text = chunk.toString();
    callback(null, text.toUpperCase());
  },
});

const writableStream = new Writable({
  // Consume each transformed chunk
  write(chunk, encoding, callback) {
    console.log("Received chunk:", chunk.toString());
    callback();
  },
});

// Connect the streams
readableStream.pipe(transformUpper).pipe(writableStream);

// Listen for completion
writableStream.on("finish", () => {
  console.log("Stream processing completed!");
});
