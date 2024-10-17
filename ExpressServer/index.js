const express=require('express')
const app=express();
const path=require('path')
//APIs
app.get("/",(req,res)=>{
    res.write("Hello world")
    res.write("Hello world")
    res.end();
})
app.get("/about",(req,res)=>{
    // res.write("About us...")
    // res.send("hello world")
    res.sendFile(path.join(__dirname,"About.html"))
    // res.end()
    
})
app.listen(2000,"127.0.0.2",()=>{
    console.log("Server is started at http://127.0.0.2:2000")
})//http://localhost:2000
