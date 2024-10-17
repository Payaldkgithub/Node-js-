const path=require('path');
const mypath="assets/images/nature/flower.jpeg"
console.log(path.dirname(mypath));
console.log(path.extname(mypath));
console.log(path.basename(mypath));
console.log(path.sep);
console.log(path.join("src",mypath));
console.log(path.join("..",mypath));