const express = require("express");
const app = express();
const cookie = require("cookie-parser");
const multer = require("multer");
const path = require("path");

//middleware
app.use(express.json()); //to accept json data from client
app.use(express.urlencoded({ extended: true })); //to accept the url-encodded data from client forms
app.use(cookie()); // to parse cookie datas

//file uploading using multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), (req, res) => {
  res.send(`File uploaded successfully: ${req.file.filename}`);
});
//getApi(query)
app.get("/query", (req, res) => {
  console.log(req.query);
});
//getApi(params)
app.get("/user/:name", (req, res) => {
  console.log(req.params);
});

//post api
app.post("/data", (req, res) => {
  console.log(req.body);
  res.send("post data sucessfully");
});

//post api url
app.post("/url", (req, res) => {
  console.log(req.body);
  res.send("URL encodded DATA");
});
//get api headers
app.get("/head", (req, res) => {
  res.send(req.headers);
});

//post API status code
app.post("/status", (req, res) => {
  let userData = { username: "payal", password: 123456 };
  let { username, password } = req.body;
  if (!username) return res.status(400).send({ error: "Username is required" });
  else if (!password)
    return res.status(400).send({ error: "Password is required" });
  else {
    if (userData.username == username && userData.password == password) {
      return res.status(200).send({ message: "Data is matched" });
    } else return res.status(400).send({ error: "DATA is not Matched" });
  }
});
//post api cookie
app.post("/cookie", (req, res) => {
  let { message } = req.body;
  res.cookie("msg", message);
  res.status(200).send({ message: "successfully set cookie" });
});

//get cookie
app.get("/cookie", (req, res) => {
  console.log(req.cookies);
  res.send("successfully get cookie ");
});
app.get("/", (req, res) => {
  console.log("Server is running sucessfully");
});
const PORT = 4000;
const hostname = "127.0.0.4";
app.listen(PORT, hostname, () => {
  console.log(`server is running on http://${hostname}:${PORT}`);
});
