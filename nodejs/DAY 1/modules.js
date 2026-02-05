import os from 'node:os';

console.log("CPUS", os.cpus().length);
console.log("totalmem", os.totalmem());
console.log("hostname", os.hostname());
console.log("Uptime", os.uptime()/(60*60));
console.log("Homedir", os.homedir());
console.log("Machine", os.machine());
