const express = require('express')
const PORT = 5000;
const app = express();

app.use((req,res,next) => {
    const time = new Date().toLocaleDateString();
    console.log(`${time} INCOMING: ${req.method} to ${req.url}`)
    next()
})

const Checkelectioncity = (req,res,next) =>{
    const {city} = req.query;
    if (city && city.toLowerCase() === 'mumbai'){
    console.log("VERIFIED:: MUMBAI RESIDENT")
    next();}
    else{
        console.log("BLOCKED: NOT RESIDENT OF MUMBAI")
        res.status(403).send("<h1>403: This election is for Mumbai residents only!</h1>")
    }
}

app.get(('/vote/:voterID'),Checkelectioncity,(req,res) =>{
    const {voterID} = req.params
    const {name} = req.query;

    res.json({
        message: "SUCCESSFUL REGISTRATION",
        id: voterID,
        name: name || "Guest Voter",
        location: "Mumbai Main Ward"
    })
})

app.get(('/'),(req,res)=>{
    res.send("<h2>VOTER SYSTEM ONLINE - STANDING BY</h2>")
})

app.listen(PORT,()=>{
    console.log("SERVER READY TO FLY BOSS!! AT PORT")
})
