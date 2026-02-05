const fs = require('fs').promises
const { readFile } = require('fs')
const path = require('path')

async function readfile(){
    try{
        const targetdir = path.join(__dirname)
        const files = await fs.readdir(targetdir)

        console.log(`STARTING AUDITING IN ${targetdir}`)
        for (const file of files){
            const fullpath = path.join(targetdir,file)
            const stats = await fs.stat(fullpath)
        

        if(stats.isFile()){
            setImmediate(() =>  {
                const sizeinkb = (stats.size/1024).toFixed(2)
                console.log(`[FILE]${file} - ${sizeinkb} KB`)
            })
        }
    }
console.log("AUDITS REQUESTS QUEUED")
    }catch(err){
        console.log("ERROR AAGYA LMAO",err.message)
    }
}
readfile();