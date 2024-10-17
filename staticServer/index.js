const express=require('express');
const path=require('path')
const app=express();
const fs=require("fs");
const { error } = require('console');
// const filepath=path.join(__dirname,"public","pages","Home.html");
// console.log(filepath)
app.use(express.static(path.join(__dirname,"public")))// for navigate page
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"public","Home.html"))
})
// app.get("/About.html",(req,res)=>{
//     res.sendFile(path.join(__dirname,"public","pages","About.html"))
// })
// app.get("/Home.css",(req,res)=>{
//     res.sendFile(path.join(__dirname,"public","css","home.css"))
// })
app.get("/data",(req,res)=>{
    res.send({
        name:"payal",
        address:"banglore"
    })
})
app.post("/postData",(req,res)=>{
    console.log(req.body)
    res.send({message:"Data received"})
})
app.post("/login",(req,res)=>{
    const {username , password}=req.body;
    let users=JSON.parse(fs.readFileSync("./public/loginuser.json","utf-8"))
    if(username && password){
        users.push({username,password});
        fs.writeFileSync("./public/loginuser.json",JSON.stringify(users))
        res.sendFile(path.join(__dirname,"public","Home.html"))
    }
    else{
        res.send({error:"provide all inputs"})
    }    
})
const PORT=5000;
const hostname="127.0.0.3";
app.listen(PORT,hostname,()=>{
    console.log(`server is running on http://${hostname}:${PORT}`)
})
