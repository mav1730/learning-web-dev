const adbox = document.getElementById("add")
const rembox = document.getElementById("remove")
const color = document.getElementById("color")
const toggle = document.getElementById("toggle")
const reset = document.getElementById("reset")
const container = document.getElementById("container");
 //STEP 1 OR PROCESS 1   
let selectedBox=null;
adbox.addEventListener("click",() =>{
    const box=document.createElement("div")
    box.classList.add("box");
  container.appendChild(box);
})
//PROCESS 2
container.addEventListener("click", function (event) {
  if (!event.target.classList.contains("box")) return;

  if (selectedBox) {
    selectedBox.classList.remove("selected");
  }

  selectedBox = event.target;
  selectedBox.classList.add("selected");
});
//PROCESS 3
rembox.addEventListener("click",()=>{
    if(!selectedBox) return;
    selectedBox.remove()
    selectedBox=null
})
function raand(){
    let val1=Math.floor(Math.random()*255)
    let val2=Math.floor(Math.random()*255)
    let val3=Math.floor(Math.random()*255)
return (`rgb(${val1},${val2},${val3})`)
}
//PROCESS 4
color.addEventListener("click",()=>{
    if (!selectedBox) return;
    selectedBox.style.backgroundColor = raand()
})
//PROCESS 5
let isON=false
toggle.addEventListener("click",() =>{
 isON=!isON
 selectedBox.style.backgroundColor=isON?"green":"grey";
})  
//process 6
reset.addEventListener("click",()=>{
  container.innerHTML="";
  selectedBox=null;
})


