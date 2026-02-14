const fs = require('fs');

const src = fs.createReadStream('test.txt',{highWaterMark:10})
const dest = fs.createWriteStream('destination.txt')

src.pipe(dest);

console.log("PIPE IS CONNECTED DATA IS FLOWING")

src.on('data', (chunk) => {
    console.log(`📦 Moving chunk: "${chunk.toString()}"`);
});

dest.on('finish', () => {
    console.log("✅ DONE! Check your folder for 'destination.txt'");
});

src.on('error', (err) => {
    console.log("❌ ERROR:", err.message);
});

console.log("🚀 Pipe connected...");