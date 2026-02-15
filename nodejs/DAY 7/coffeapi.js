const http = require('http')
const { json } = require('stream/consumers')

const server = http.createServer((req,res) =>{
    if (req.url === '/'){
        res.writeHead(200,{'content-type':'text/html'})
        res.end('<h1>WELCOME TO HOMEPAGE BRO!!</h1>')
    }else if (req.url === '/status'){
        res.writeHead(200,{'content-type':'text/json'})
        res.end(JSON.stringify({ "orderID": 101, "status": "Brewing", "eta": "5 mins" }))
    }else if (req.url === '/admin'){
        res.writeHead(200,{"content-type":'text.plain'})
        res.end("ENTRY DENIED Bro!! this page is for admin only hahaha")
    }else{
        res.writeHead(418,{'content-type':'text/plain'})
        res.end("I AM A TEAPOT!,I CANNOT BREW COFFEE")
    }
}
)

server.listen(4000,() =>{
    console.log("SERVER IS READY TO GO BOSS!!")
})