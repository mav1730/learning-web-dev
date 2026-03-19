const express = require('express')
const app = express();
const PORT = 5001

app.get('/',(req,res) =>{
    res.send("HELLO BRO TRY OUR NEW CALCULATING FEATURE HAHAHAH")
})
app.get('/calculate/:num1/:num2',(req,res) =>{
    const {num1,num2} = req.params
    const sum = Number(num1) + Number(num2)
    console.log(num1+num2+sum)
    res.json({
        operation:"adding",
        number_1:num1,
        number_2:num2,
        message:sum
    })
})
app.listen(PORT,() =>{
    console.log("SERVER IS READY TO RUNNN BOSS!!!!")
})