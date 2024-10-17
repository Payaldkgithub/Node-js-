const { error } = require('console');
const fs=require('fs')
//create sync file
fs.writeFileSync("test.txt","hello world");
//create file async
fs.writeFile("test1.txt","hiiiiiiiii",(error)=>{
    if(error) console.log(error)
    else console.log("file created successfully")
})
//read file sync
console.log(fs.readFileSync("test.txt","utf-8"));
//read file async
fs.readFile("test.txt","utf-8",(error,data)=>{
    if(error) console.log(error);
    else console.log("data is..",data);
})
//delete file sync
// fs.unlinkSync("test.txt");
//delete file 
fs.unlink("test.txt",(error)=>{
    if(error) console.log(error);
    else console.log("file deleted sucessfully")
})
// fs.appendFileSync("./test1.txt","payal prajapati")
// fs.appendFile("./test1.txt","I want to append a code",(error)=>{
//     if(error) console.log(error);
//     else console.log("file is updated sucessfully")
// })
// fs.renameSync("./test1.txt","./test2.txt")
// fs.rename("./test2.txt","./demo.txt",(error)=>{
//     if(error) console.log(error);
//     else console.log("file renamed sucessfully")
// })

//sync copy call by reference
// fs.linkSync("./demo.txt","./link.txt")
// fs.link("./test1.txt","./link1.txt",(error)=>{
//     if(error) console.log(error)
//     else console.log("file copied")
// })
//sync
// fs.copyFileSync("./demo.txt","./copy.txt")
// fs.copyFile("./demo.txt","copy1.txt",(error)=>{
//     if(error) console.log(error);
//     else console.log("filed copied sucessfully")
// })

//Folder....
//create
// fs.mkdir('./myfolder1',(error)=>{
//     if(error) console.log(error)
//     else console.log("folder is created")
// })
fs.rmdir('./myfolder1',(error)=>{
    if(error) console.log(error)
    else console.log("folder is deleted")
})