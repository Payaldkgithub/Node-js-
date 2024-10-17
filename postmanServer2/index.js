const express = require("express");
const mongoose = require("mongoose");
const app = express();
const { studentRouter } = require("./Routes/studentRouter");
const { teacherRouter } = require("./Routes/teacherRouter");
const Student = require("./Schema/studentSchema");
//middleware
app.use(express.json());

//routes
app.use("/student", studentRouter);
app.use("/teacher", teacherRouter);

mongoose
  .connect("mongodb://127.0.0.1:27017/College_db")
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.log("mongodb error", err);
  });

//server
app.get("/", (req, res) => {
  console.log("Server is running sucessfully");
});
const PORT = 7000;
const hostname = "localhost";
app.listen(PORT, hostname, () => {
  console.log(`server is running on http://${hostname}:${PORT}`);
});
