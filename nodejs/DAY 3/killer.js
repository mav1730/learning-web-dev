const startTime = Date.now();

console.log("1. Setting a timer for 1 second...");
setTimeout(() => {
    console.log(`⏰ TIMER FINISHED! It took ${Date.now() - startTime}ms`);
}, 0);

console.log("2. Starting a heavy loop. The waiter is now BUSY...");

// This is the "Blocking" code. It stays on the Call Stack.
// On an i3, 5 billion might take a few seconds. 
let count = 0;
for (let i = 0; i < 500000; i++) {
    count++;
}

console.log("3. Loop finished. The waiter is finally free!");