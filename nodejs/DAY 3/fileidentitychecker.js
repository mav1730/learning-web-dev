const fs = require('fs').promises
const path = require('path')

async function checkfile(){
    try{
        const targetfile = path.join(__dirname,'killer.js')
        // const files = await fs.readFile(targetfile)
        const stats = await fs.stat(targetfile)
        
        if (stats.isFile()){   
                const sizeinkb = (stats.size/1024).toFixed(2);
                if(sizeinkb >= 1){
                    console.log("Whoa, this file is a Chonk.")
                }else{
                    console.log(`This file is a feather . ${sizeinkb}`)
                }
            
        }
}
catch(err){
    console.log("ERROR MIL GYO RE BABA",err.message)
}
}

checkfile();