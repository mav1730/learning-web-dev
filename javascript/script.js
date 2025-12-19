const increase=document.getElementById("increasebtn")
const decreasebtn=document.getElementById("decreasebtn")
const resetbtn=document.getElementById("resetbtn")
const label=document.getElementById("label")

let count=0;
increasebtn.onclick = function(){
    count++;
    label.textContent=count;   
}
decreasebtn.onclick = function(){
    count--;
    label.textContent=count;   
}
resetbtn.onclick = function(){
    count=0;
    label.textContent=count;   
}

