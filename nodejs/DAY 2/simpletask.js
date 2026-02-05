const fs = require('fs').promises;

async function simpletask(){
    console.log("HI this is a simple task....starting the task");

    await fs.writeFile('note.txt','I am learning node');

    console.log("file created ")
}
simpletask();