const http=require('http')
const fs=require('fs')
const { error } = require('console')
const app=http.createServer((req,res)=>{
    const {url,method}=req
    console.log(url,method)
    if(method=="GET"){
        if(url=="/"){
            const data=fs.readFileSync("./pages/home.html")
            res.write(data)
            res.end();
        }
        if(url=="/about"){
            const data=fs.readFileSync("./pages/about.html")
            res.write(data);
            res.end()
        }
        if(url=="/home.css"){
            const data=fs.readFileSync("./css/home.css")
            res.write(data);
            res.end()
        }
        if(url=="/contact"){
            const data=fs.readFileSync("./pages/contact.html")
            res.end(data)
        }
        if(url=="/signup"){
            const data=fs.readFileSync("./pages/signup.html")
            res.end(data);
        }
        if(url=="/signup.css"){
            const data=fs.readFileSync("./css/signup.css")
            res.end(data);
        }
        
        
    }
    else if(method=="POST"){
        if(url=="/data")
        {
            req.on("data",(data)=>{
                let userData=JSON.parse(data.toString());
                console.log(userData);
                let users=JSON.parse(fs.readFileSync("./user.json","utf-8"))
                let isUser=users.find((data)=>data.username==userData.username)
                if(isUser){
                    res.write(JSON.stringify({error:"USER ALREADY EXISTS"}))
                }
                else{
                    users.push(userData);
                    fs.writeFileSync("./user.json",JSON.stringify(users))
                    res.write(JSON.stringify({message:"DATA received"}))
                } 
                res.end()
            })                  
        }
    }
   
})
app.listen(8000) //http://localhost:8000