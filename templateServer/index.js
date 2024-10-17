const express=require('express')
const app=express();
const path=require('path');
//middleware
app.use(express.static(path.join(__dirname,"public")))
//view engine setup
app.set("view engine","ejs");

//view folder setup(default views)
app.set("views","public")
//api
app.get("/",(req,res)=>{
    res.render("Home",{name:"payal",age:25,address:"blr",
        fruits:["apple","grapes","Orange","Mango","Banana"]})
    //res.render("About")
})
app.get("/about",(req,res)=>{
    res.render("About",{msg:"It is a Dynamic created with EJS"})
})




const PORT=3000;
const hostname="127.0.0.3";
app.listen(PORT,hostname,()=>{
    console.log(`server is running at http://${hostname}:${PORT}`)
})