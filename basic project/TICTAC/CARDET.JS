const carname=document.getElementById("carname")
const carprice=document.getElementById("carprice")
const addcardetails=document.getElementById("add")
//let editdetails=document.getElementsByClassName("edit")
const showdetails=document.getElementById("show")
const output=document.querySelector(".added")

let cardet=[]

addcardetails.addEventListener("click",()=>{
    const NAME=carname.value
    const PRICE=carprice.value

    
    const car={
        NAME:NAME,
        PRICE:PRICE
    }
    cardet.push(car)

    output.textContent=`ADDED ${NAME} and ${PRICE}`
     carname.value = "";
      carprice.value = "";

      console.log(cardet);
})
function showcardet() {
    output.textContent = ""; 

    for (let i = 0; i < cardet.length; i++) {
        output.textContent += 
            `Car: ${cardet[i].NAME}, Price: ${cardet[i].PRICE}\n`;
    }
}

showdetails.addEventListener("click", showcardet);
