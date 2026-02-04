const fs = require('fs').promises;
const path = require('path');
async function filealt(){
    try{
    const data = await fs.readFile('note.txt','utf-8')
    const lines = data.split('\n')
    const filtering= lines.filter(lines => lines.length > 10).map(lines => lines.toUpperCase())
    console.log(filtering)
    await fs.writeFile('cleanfile.txt',filtering)
}catch(err){
    console.log("error aagya damn ",err.message);
}
}
filealt();
