// make buffer from string
let textBuffer = Buffer.from("Node js");
console.log(textBuffer);

// convert buffer to string
let BufferString = textBuffer.toString("utf-8");
console.log(BufferString);

// length of buffer
console.log(textBuffer.length);

// empty fixed buffer
let fixedBuffer = Buffer.alloc(6);
console.log(fixedBuffer);

// writing to a fixed buffer
fixedBuffer.write("API");
console.log(fixedBuffer);
console.log(fixedBuffer.toString("utf-8"));
