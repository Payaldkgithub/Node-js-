const express = require("express");
const { dbConnect } = require("./db/dbConfing");
const { userModel } = require("./Models/userModel");
const app = express();
//middlewares
app.use(express.json());
//demoAPI
app.get("/", (req, res) => {
  res.send("Hello from server");
});
//Database CRUD Apis
app.post("/addUser", async (req, res) => {
  const data = req.body;
  const userData = new userModel(data);
  await userData.save();
  res.status(201).send({ message: "User Data Stroed" });
});

app.get("/getAllUsers", async (req, res) => {
  const data = await userModel.find();
  res.status(200).send(data);
});

app.put("/update", async (req, res) => {
  const { mobile } = req.query;
  const data = req.body;
  const response = await userModel.updateOne(
    { mobile },
    {
      $set: {
        ...data,
      },
    }
  );
  if (response.modifiedCount) {
    res.status(200).send({ message: "User data Updated" });
  } else if (response.matchedCount < 1) {
    res.status(404).send({ error: "User Data not found" });
  } else {
    res.send({ message: "not modified" });
  }
});
app.delete("/delete/:id", async (req, res) => {
  let { id } = req.params;
  const response = await userModel.deleteOne({ _id: id });
  if (response.deletedCount) {
    res.status(200).send({ message: "User Deleted successfully" });
  } else {
    res.status(404).send({ error: "User not Found" });
  }
});
dbConnect();
const PORT = 7000;
const hostname = "localhost";
app.listen(PORT, hostname, () => {
  console.log(`server is running at http://${hostname}:${PORT}`);
});
