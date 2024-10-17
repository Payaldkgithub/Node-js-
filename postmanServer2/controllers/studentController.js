const { error } = require("console");
const { readFileSync, writeFileSync } = require("fs");
const { join } = require("path");
const Student = require("../Schema/studentSchema");

//get all students
const getAllStudents = async (req, res) => {
  try {
    const allStudents = await Student.find();
    res.send(allStudents);
  } catch (err) {
    res.status(501).send({ msg: "Internal Server Error.." });
  }
};
//get student by id
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    res.status(200).send(student);
  } catch (err) {
    res.status(501).send("Internal server error");
  }
};
//adding student
const addStudent = async (req, res) => {
  try {
    // let students = JSON.parse(readFileSync("./json/students.json", "utf-8"));
    // console.log(students);
    const studentData = req.body;
    const { firstName, lastName, email, course, gender } = studentData;
    if (firstName && email && course) {
      const result = await Student.create({
        firstName,
        lastName,
        email,
        gender,
        course,
      });
      console.log(result);
      res.status(200).send("student sucessfully added");

      // const students = JSON.parse(
      //   readFileSync(join(__dirname, "..", "json", "student.json"), "utf-8")
      // );
      // let isStudent = students.find(
      //   (data) => studentData.id == data.id || studentData.mobile == data.mobile
      // );
      // console.log(isStudent);
      // if (!isStudent) {
      //   students.push(studentData);
      //   writeFileSync("./json/students.json", JSON.stringify(students));
      //   // writeFileSync(
      //   join(__dirname, "..", "json", "student.json"),
      //   JSON.stringify([...students, studentData])
      // );
      //     res.status(200).send("student sucessfully added");

      //   } else {
      //     return res.send({ error: "student is already exist" });
      //   }
    } else {
      return res.status(400).send({ error: "provide all the required field" });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: "something went wrong", errorMessage: error.message });
  }
};
const studentLogin = (req, res) => {
  try {
    let { mobile, password } = req.body;
    if (mobile && password) {
      const students = JSON.parse(
        readFileSync(join(__dirname, "..", "json", "students.json"), "utf-8")
      );
      let isStudent = students.find((ele) => ele.mobile == mobile);
      if (isStudent) {
        if (isStudent.password == password) {
          return res.status(200).send({ message: "Login successfully" });
        } else {
          return res
            .status(400)
            .send({ error: "password doesn't not match please try again!!!" });
        }
      } else {
        return res.status(401).send({ error: "Student Not Found" });
      }
    } else {
      return res.status(400).send({ error: "mobile and password is required" });
    }
  } catch (err) {
    return res
      .status(500)
      .send({ error: "Internal Server Error", errorMessage: error.message });
  }
};
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      await Student.findByIdAndDelete(id);
      res.status(200).send({ msg: "Successfully deleted" });
      // const students = JSON.parse(
      //   readFileSync(join(__dirname, "..", "json", "students.json"), "utf-8")
      // );
      // console.log(students);
      // let isStudent = students.find((ele) => ele.id == id);
      // console.log(isStudent);
      // if (isStudent) {
      //   let updatedStudents = students.filter((ele) => ele.id != id);
      //   writeFileSync(
      //     join(__dirname, "..", "json", "students.json"),
      //     JSON.stringify(updatedStudents)
      //   );
      //   return res.status(200).send({ message: "Student Details deleted" });
      // } else {
      //   return res.status(404).send({ error: "Student Not Found" });
      // }
    } else {
      return res.status(400).send({ error: "id is required" });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ error: "Internal server Error", errorMessage: error.message });
  }
};
const updateStudent = async (req, res) => {
  try {
    let data = req.body;
    let { id } = req.query;
    if (id) {
      await Student.findByIdAndUpdate(id, data);
      res.status(200).send("successfully updated");
      // const students = JSON.parse(
      //   readFileSync(join(__dirname, "..", "json", "students.json"), "utf-8")
      // );
      // let isStudent = students.find((ele) => ele.id == id);
      // if (isStudent) {
      //   let updatedStudents = students.map((ele) => {
      //     if (ele.id == id) {
      //       return { ...ele, ...data };
      //     }
      //   });
      //   writeFileSync(
      //     join(__dirname, "..", "json", "students.json"),
      //     JSON.stringify(updatedStudents)
      //   );
      //   return res.status(200).send({ message: "student data updated" });
      // } else {
      //   return res.status(404).send({ error: "Student not found" });
      // }
    } else {
      return res.status(400).send({ error: "id is needed" });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ error: "Internal server Error", errorMessage: error.message });
  }
};
module.exports = {
  addStudent,
  studentLogin,
  deleteStudent,
  updateStudent,
  getAllStudents,
  getStudentById,
};
