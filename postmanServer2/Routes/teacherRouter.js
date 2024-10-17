const express = require("express");
const teacherRouter = express.Router();
const {
  addTeacher,
  getTeacher,
  teacherLogin,
  deleteStudent,
  updateTeacher,
} = require("../controllers/teacherController");

//get api
teacherRouter.get("/", getTeacher);
//post api
teacherRouter.post("/add", addTeacher);
// teacherRouter.post("/add", addTeacher);
teacherRouter.post("/login", teacherLogin);
teacherRouter.delete("/delete/:id", deleteStudent); //http://localhost:7000/teacher/delete/id
teacherRouter.put("/update", updateTeacher);
module.exports = { teacherRouter };
