import process from "node:process";

// Run Command: node --env-file=.env src/01-process-object.ts

const port = process.env.PORT;
const nodeEnv = process.env.NODE_ENV;

console.log(port);
console.log(nodeEnv);

const command = process.argv[2] ?? "start";
const shouldFail = process.argv.includes("--fail");
const shouldCrash = process.argv.includes("--crash");

process.on("exit", (code) => {
  console.log(`Process finished with exit code ${code}`);
});

function runApp(): void {
  console.log({ command });

  if (shouldFail) {
    console.error("Manually failure triggered with --fail flag");
    process.exit(1);
  } else if (shouldCrash) {
    console.error("Manually crashed triggered with --crash flag");
    process.exit(1);
  } else {
    console.log("Something bad happened at our end!");
  }

  // Run Command: node --env-file=.env src/01-process-object.ts --start --fail
  // Run Command: node --env-file=.env src/01-process-object.ts --start --crash
}

runApp();
