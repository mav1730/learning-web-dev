const minnum=0;
const maxnum=20;

const answer=Math.floor(Math.random()*(maxnum-minnum+1)+minnum);
let attempts=0;
let guess=0;
let run=true;
let name=prompt("ENTER YOUR NAME PLEASE!!");
while(run){
guess=Number(window.prompt(`ENTER A NUM BETWEEN ${minnum} - ${maxnum}`));
if(isNaN(guess)){
    alert("please enter a valid number");
}else if(guess<minnum || guess>maxnum){
    alert("ENTER A NUMBER IN RANGE");
}else{
    attempts++;
    if(guess>answer){
        alert("lower !!!TRY AGAIN");
    }else if(guess<answer){
        alert("higher TRY AGAIN!!!");
    }else{
        alert(`CONGRATSSSSSS ${name}I KNEW YOU WILL RIGHTTT!!!!! YOU TOOK ${attempts} ATTEMPTS`);
        run=false;
    }
}
}



