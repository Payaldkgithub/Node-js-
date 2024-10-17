const { error } = require("console");
const { readFileSync, writeFileSync } = require("fs");
const { join } = require("path");

const getTeacher = (req, res) => {
  res.send("teacher router is working...");
};
const addTeacher = (req, res) => {
  try {
    let teachers = JSON.parse(
      readFileSync(join(__dirname, "..", "json", "teacher.json"), "utf-8")
    );
    let teacherData = req.body;
    const { id, name, mobile, password, course } = teacherData;
    if (id && name && mobile && password && course) {
      let isTeacher = teachers.find(
        (ele) => ele.id == id || ele.mobile == mobile
      );
      if (isTeacher) {
        res.status(400).send("teacher is already exist");
      } else {
        writeFileSync(
          join(__dirname, "..", "json", "teacher.json"),
          JSON.stringify([...teachers, teacherData])
        );
        res.status(200).send("Teacher Added Succesfully");
      }
    } else {
      res.status(400).send({ error: "Provide All fields.." });
    }
  } catch (error) {
    res.status(401).send("something went wrong");
  }
};
const teacherLogin = (req, res) => {
  try {
    let teacherData = req.body;
    let { mobile, password } = teacherData;
    if (mobile && password) {
      let teachers = JSON.parse(
        readFileSync(join(__dirname, "..", "json", "teacher.json"), "utf-8")
      );
      //   console.log(teachers);
      let isTeacher = teachers.find((ele) => ele.mobile == mobile);
      console.log(isTeacher);
      if (isTeacher.password == password) {
        res.status(200).send({ message: "teacher login successfully" });
      } else {
        res.status(400).send({ error: "mobile and password does not match" });
      }
    } else {
      res.status(401).send({ error: "mobile and password is required" });
    }
  } catch (error) {
    res.status(400).send({ error: "something went wrong" });
  }
};
const deleteStudent = (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    if (id) {
      const teachers = JSON.parse(
        readFileSync(join(__dirname, "..", "json", "teacher.json"), "utf-8")
      );
      const isTeacher = teachers.find((ele) => ele.id == id);

      if (isTeacher) {
        const updatedTeachers = teachers.filter((ele) => ele.id != id);
        writeFileSync(
          join(__dirname, "..", "json", "teacher.json"),
          JSON.stringify(updatedTeachers)
        );
        res.status(200).send({ message: "Teacher deleted successfully" });
      } else {
        res.status(404).send({ error: "Teacher Not Found" });
      }
    } else {
      res.status(400).send({ error: "Id is required" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ error: "Intenal server error", errorMessage: error.message });
  }
};
const updateTeacher = (req, res) => {
  try {
    let { id } = req.query;
    let data = req.body;
    if (id) {
      const teachers = JSON.parse(
        readFileSync(join(__dirname, "..", "json", "teacher.json"), "utf-8")
      );
      const isTeacher = teachers.find((ele) => ele.id == id);
      if (isTeacher) {
        let updatedTeachers = teachers.map((ele) => {
          if (ele.id == id) {
            return { ...ele, ...data };
          }
        });
        writeFileSync(
          join(__dirname, "..", "json", "teacher.json"),
          JSON.stringify(updatedTeachers)
        );
        res.status(200).send({ message: "Teacher Updated Successfully" });
      } else {
        res.status(404).send({ error: "Teacher not found" });
      }
    } else {
      res.status(404).send({ error: "Id is Required" });
    }
  } catch {
    res
      .status(500)
      .send({ error: "Intenal server error", errorMessage: error.message });
  }
};
module.exports = {
  addTeacher,
  getTeacher,
  teacherLogin,
  deleteStudent,
  updateTeacher,
};
