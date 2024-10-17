const http=require('http')
const server=http.createServer((req,res)=>{
    console.log(req.method,req.url);
    if(req.url=="/")
    {
        res.write("<h1>welcome to server</h1>")
        res.end();
        
    }
    if(req.url=="/about"){
        res.write("<h1>welcome to about us page</h1>")
        res.end()
    }
})
server.listen(4000)

