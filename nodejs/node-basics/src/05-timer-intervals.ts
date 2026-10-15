// setTimeout
function runSetTimeout(): void {
  console.log("setTimeout started...");
  setTimeout(() => {
    console.log("setTimeout ended after 3 seconds...");
  }, 3000);
  console.log("I'm running in between!");
}

// clearTimeout
function runClearTimeout(): void {
  const timerId = setInterval(() => {
    console.log("This will not run!");
  }, 2000);
  clearTimeout(timerId);
  console.log("clearTimeout cancelled the 2 seconds timer.");
}

// setInterval
function runSetInterval(): void {
  let count = 0;
  const intervalId = setInterval(() => {
    count++;
    console.log(`setInterval tick ${count}`);

    if (count === 3) {
      clearInterval(intervalId);
      console.log("setInterval stopped!");
    }
  }, 500);
}

// setImmediate
//

runSetTimeout();
runClearTimeout();
runSetInterval();
