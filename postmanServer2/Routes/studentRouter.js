const express = require("express");
const studentRouter = express.Router();
const {
  addStudent,
  studentLogin,
  deleteStudent,
  updateStudent,
  getAllStudents,
  getStudentById,
} = require("../controllers/studentController");

//api
//demo
studentRouter.get("/", (req, res) => {
  res.send("student router is working");
});
studentRouter.get("/:id",getStudentById)
//post {add student}
studentRouter.post("/add", addStudent);
studentRouter.get("/students", getAllStudents);

//login(student login)
studentRouter.post("/login", studentLogin);
studentRouter.delete("/delete/:id", deleteStudent); //http://localhost:7000/student/delete/1
studentRouter.put("/update", updateStudent); //http://localhost:7000/student/update?id=1

module.exports = { studentRouter };
