import { EventEmitter } from "node:events";

const appEvents = new EventEmitter();

type UserRegisterPayload = {
  id: number;
  email: string;
};

function sendWelcomeEmail(user: UserRegisterPayload): void {
  console.log(`Welcome email sent to ${user.email}`);
}

function logRegistration(user: UserRegisterPayload): void {
  console.log(`Registration logged for user ${user.id}`);
}

appEvents.on("user:registered", sendWelcomeEmail);
appEvents.on("user:registered", logRegistration);
appEvents.once("user:registered", (user: UserRegisterPayload) => {
  console.log(`First registration: ${user.email}`);
});

function registerUser(id: number, email: string): void {
  const user: UserRegisterPayload = { id, email };
  console.log(`\nSaving user: ${email}`);

  appEvents.emit("user:registered", user);
}

registerUser(1, "userone@gmail.com");
registerUser(2, "usertwo@gmail.com");
appEvents.off("user:registered", sendWelcomeEmail);

console.log("\nWelcome email listener removed.");
registerUser(3, "userthree@gmail.com");
