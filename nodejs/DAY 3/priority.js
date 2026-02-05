
setTimeout(()=>
console.log("4.THIS IS A TIMEOUT FN IT WILL PRINT AFTER SYNC IS DONE AND OTHER THING IS DONE"),1000)

console.log("1.THIS IS A PRIORITY CODE IT WILL EXECUTE FIRST ");

Promise.resolve().then(() => {
    console.log("3.this has to be printed 3rd   ")
})

process.nextTick(() => {
    console.log("2.PRIORITY TASK AFTER ALL SYNC CODE IS RUNNED")
});

