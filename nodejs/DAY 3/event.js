console.log("A");

process.nextTick(() => console.log("B.THE VIP"));

setTimeout(()=>console.log("C.the regular"),0);
console.log("D");