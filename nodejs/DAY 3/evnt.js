const fs = require('fs');

console.log("1: The script starts (Synchronous)");

setTimeout(() => {
    console.log("2: Timer Phase (setTimeout)");
}, 0);

setImmediate(() => {
    console.log("3: Check Phase (setImmediate)");
});

fs.readFile(__filename, () => {
    console.log("4: Poll Phase (File Read Callback)");
});

process.nextTick(() => {
    console.log("5: VIP Lane (process.nextTick)");
});

Promise.resolve().then(() => {
    console.log("6: Promise Lane (Microtask)");
});

console.log("7: The script reaches the end");