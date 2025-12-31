const adbox = document.getElementById("add")
const rembox = document.getElementById("remove")
const color = document.getElementById("color")
const toggle = document.getElementById("toggle")
const reset = document.getElementById("reset")
const container = document.getElementById("container");
    
let selectedBox=null;
adbox.addEventListener("click",() =>{
    const box=document.createElement("div")
    box.classList.add("box");
  container.appendChild(box);
})
container.addEventListener("click", function (event) {
  if (!event.target.classList.contains("box")) return;

  if (selectedBox) {
    selectedBox.classList.remove("selected");
  }

  selectedBox = event.target;
  selectedBox.classList.add("selected");
});
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
color.addEventListener("click",()=>{
    if (!selectedBox) return;
    selectedBox.style.backgroundColor = raand()
})
toggle.addEventListener("click", () => {
  if (!selectedBox) return;
  selectedBox.classList.toggle("active");
});

let isON=false
isON=!isON
toggle.addEventListener("click",() =>{
 isON=!isON
 selectedBox.style.backgroundColor=isON?"green":"grey";
})  
reset.addEventListener("click",()=>{
  container.innerHTML="";
  selectedBox=null;
})


