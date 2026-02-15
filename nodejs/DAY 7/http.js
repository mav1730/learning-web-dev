const http = require('http');;

const server = http.createServer((req,res) =>{
    if (req.url === '/'){
        res.writeHead(200,{'content-type': 'text/html'})
        res.end('<h1>HOME PAGE</h1>')
    }
    else if (req.url === '/api'){
        res.writeHead(200,{'content-type':'application/json'})
        res.end(JSON.stringify({name:"sleeper Build",status:"active"}))
    }
    else{
        res.writeHead(404,{'content-type':'text/plain'});
        res.end('404 NOT FOUND ')
    }
});
server.listen(8080,() =>{
    console.log("SERVER IS READY TO GO")
})