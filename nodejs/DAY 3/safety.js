setInterval(() => {
    console.log("WAITER:HEY HOW CAN I HELP YOU?")
}, 500);

setImmediate(() =>{
    console.log("HEAVY TASK:I am finished")
})