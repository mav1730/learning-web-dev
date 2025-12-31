//let box=document.getElementsByClassName("box")
let box=document.querySelectorAll(".box")

function raand(){   
    let val1= Math.floor(0+Math.random()*255)
    let val2= Math.floor(0+Math.random()*255)
    let val3= Math.floor(0+Math.random()*255)

    return(`rgb(${val1}, ${val2},${val3})`)
}

let bodybb = document.getElementById("body")
bodybb.style.backgroundColor=raand()

setInterval(() => {
    box.forEach(box =>{
box.style.backgroundColor=raand()
})
    bodybb.style.backgroundColor=raand()
}, 1000);
