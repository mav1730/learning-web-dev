const express = require('express');
const app = express();
const PORT = 5000;

app.use((req,res,next)=>{
    const TIME = new Date().toLocaleDateString();
    console.log(`TIME:${TIME} incoming request${req.method} to ${req.url}`)
    next();
})
app.get('/',(req,res) =>{
    res.send("DAY 8 IS OFFICIALLY RUNNING")
})
// app.get('/api',(req,res)=>{
//     res.json({message:"hello from mumbai",status:"READY FOR PHASE 2"})
// })

app.get('/profile/:username',(req,res) =>{
    const name=req.params.username
    console.log(req.params);
    if(name == "YASH"){
        res.send("WELCOME BOSS!!YOU DID IT !!!")
    }else{
    res.send(`WELCOME TO THE PROFILE OF ${name.toUpperCase()}!!!`)}
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

app.get('/search',(req,res)=>{
    const {city,filter} = req.query
    if (city && city.toLowerCase() == 'mumbai' ){
        res.send("YOVE HITTED THE RIGHT QUERY")
        
    }else{
        res.send("INCORRECT FILTER")
    }
    res.send(`searching for ${city} in filter ${filter}`)
    console.log(req.params)
})

// app.get('/shop/:category/:item',(req,res)=>{
//     const {category,item} = req.params;
//     res.json({
//         category:category,
//         item:item,
//         message:`you are looking at ${item} in the ${category}`
//     })
// })
app.listen(PORT,()=>{
    console.log("THE SERVER IS READY TO FLY SIR!! AT PORT")
})

