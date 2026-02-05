//Hey, we have a file called secrets.json. It might not exist, but if it does,
//  I want you to read it and tell me the size. 
// If it doesn't exist, don't crash—just create an empty file called audit.log

const fs = require('fs').promises;

async function findfile(){
    try{
        const stats = await fs.stat("secrets.json")
        console.log("FILE FOUND,FILE SIZE IS:",stats.size)
    }catch(err){
        console.log("OOPs no file founded",err.message);
        const newfile = await fs.writeFile("audit.log","file created")
    }
}
findfile();