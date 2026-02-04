const fs = require('fs').promises;

async function myidentity(){
    try {
        console.log("writting first file")
        await fs.writeFile('me.txt','MY name is josa morellow')
        
       console.log("reading file :")
        await      fs.readFile('meahu.txt','utf-8')

        console.log("done reading")

    }catch(err){
        console.log("somethings wrong bitch try ",err.message)
    }
}

myidentity();