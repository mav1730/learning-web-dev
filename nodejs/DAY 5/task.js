const eventemitter = require('events');
const study_session = new eventemitter();

let streak = 0;

study_session.on('studied',(currentstreak) =>{
    streak++ 
    console.log(`Day ${currentstreak} in the bag!!! INTERNSHIP LOADING..... `);
})
study_session.on('studied',(currentstreak) =>{
    if(currentstreak == 5){console.log("GOAL REACHED!!!TIME FOR A VADA PAV!!!!!")}
})

for (i=1;i<=10;i++){
    study_session.emit('studied',i)
}