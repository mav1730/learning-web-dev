const eventemitter = require('events');
const gymbell = new eventemitter();

gymbell.on('entry',(name) =>{
    console.log(`HELLO!!! ${name} ENTERED THE GYM WELCOME!!`);
})

const welcomead = (name) => {
    console.log(`still sending ads to ${name}`)
}
gymbell.once('entry',(name) =>{
    console.log(`SPECIAL GIFT!! ${name} get flat 20% off on the next sys`);
})
gymbell.emit('entry','RIYA')
gymbell.emit('entry','YASH')
gymbell.on('entry',welcomead)
gymbell.emit('entry','suman')
gymbell.emit('entry','ABHIMANYU')
gymbell.removeListener('entry',welcomead)

gymbell.emit('entry','VRINDA')