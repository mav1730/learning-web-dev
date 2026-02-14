const fs = require('fs').promises;
const path = require('path');
const eventemitter = require('events');


const uploadsys = new eventemitter();
const filename = process.argv[2]

uploadsys.on('done',(name)=>{
    setImmediate(() =>{
        console.log(` SUCCESS: ${name} is ready for YouTube!`)
    })
})

async function startupload(){
    if(!filename){
        console.log("ERROR PLEASE PROVIDE FILENAME BRO")
        return;
    }
    try {
        const uploadpath = path.join(__dirname,'uploads')
        await fs.mkdir(path.join(__dirname,'uploads','2026','feb'),{recursive:true})
        console.log(` Uploading ${filename} to ${uploadpath}...`);
        uploadsys.emit('done',filename);
    }catch(err){
        console.log(`THERES A ERROR LOL:`,err.message)
    }
}

startupload()