let result=document.getElementById("result");
let tofaren=document.getElementById("tofaren");
let tocel=document.getElementById("tocel");
let num=document.getElementById("textbox")
let temp;



function convert(){
    num=Number(num.value);
if(isNaN(num)){
    result.textContent="PLEASE ENTER A VALID NUMBER";
}else{
if(tofaren.checked){
    num=(num*(9/5))+32;
result.textContent=num;
}else if(tocel.checked){
    num=(num-32)*(5/9);
result.textContent=num;
}else{
    result.textContent="please select a unit";
}
}}
