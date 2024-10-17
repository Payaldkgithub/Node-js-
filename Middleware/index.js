const express=require('express')
const app=express();
const userRouter=express.Router();

//application middleware

const m1=(req,res,next)=>{
    console.log("hii");
    next();
}
const m2=(req,res,next)=>{
    console.log("hello");
    next();
}
app.use("/",m1,m2);
app.get("/",(req,res)=>{
    res.send("Hello world");
})

//Routing middleware
app.use("/user",userRouter);
userRouter.get("/virat",(req,res)=>{
    res.send({name:"virat",age:20})
})
userRouter.get("/payal",(req,res)=>{
    res.send({name:"payal",age:23})
})
const PORT=8000;
const hostname="127.0.0.8";
app.listen(PORT,hostname,()=>{
    console.log(`server is running at http://${hostname}:${PORT} `)
})
