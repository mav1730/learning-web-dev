import os from 'node:os'

function monitor(){
const oldcpu = os.cpus();
setTimeout(() => {
    const newcpu = os.cpus();
}, 1000);
}

setInterval(monitor(), 1000);