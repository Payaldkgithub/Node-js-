const event=require('events')
const eventEmmiter=new event();
eventEmmiter.on("myevent",()=>{
    console.log("my event is executed");
})
eventEmmiter.once("once_event",()=>{
    console.log("event is executed only once")
})
const printmsg=()=>{
    console.log("hello node js")
}
function display(){
    console.log("this is called  add event lister")
}
eventEmmiter.on("hello",printmsg)
eventEmmiter.emit('myevent')
eventEmmiter.emit('myevent')
eventEmmiter.emit('once_event')
eventEmmiter.emit('once_event')
eventEmmiter.emit('once_event')
eventEmmiter.emit("hello")
eventEmmiter.addListener("print",()=>{
    console.log("no msg to display")
})
eventEmmiter.emit("print");
eventEmmiter.emit("print");
