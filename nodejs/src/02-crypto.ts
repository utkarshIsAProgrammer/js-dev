import crypto from "node:crypto";

const requestId = crypto.randomUUID();
console.log(`UUID: ${requestId}`);

const resetToken = crypto.randomBytes(16).toString("hex");
console.log(`Reset Token: ${resetToken}`);

let data = "indiedev is a programmer!"
const hash = crypto.createHash("sha256").update(data).digest("hex");
console.log(`Hash: ${hash}`)

// normal hash => data -> hash
// hmac => data + secret -> signed hash

const secret = "super-secret-key"
let message = "this is a super secret message!"
const signature = crypto.createHmac("sha256", secret).update(message).digest("hex")
console.log(`Hmac: ${signature}`)
