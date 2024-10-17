const express = require("express");
// const { connectDB } = require("./DB/dbConfig.js");
const { connectDB } = require("./DB/dbConfig.js");

const app = express();
//middleware
app.use(express.json());
//api demo
app.get("/", (req, res) => {
  res.send("server is worked");
});
//api database Crud
app.get("/allData", async (req, res) => {
  try {
    let data = await collection("products").find();
    res.send(200).send(data);
  } catch (error) {
    return res.status(500).send({ error: "Internal server error" });
  }
});
app.post("/add", async (req, res) => {
  try {
    let data = req.body;
    let collection = db.collection("products");
    let response = await collection.insertOne(data);
    res.status(201).send({ response });
  } catch (error) {
    return res.status(500).send({ error: "Server Error", msg: error.message });
  }
});

app.put("update", async (req, res) => {
  try {
    let data = req.body;
    let { id } = req.query;
    let collection = db.collection("products");
    let response = await collection.updateOne(
      { _id: id },
      { $set: { ...data } }
    );
    res.status(200).send({ response });
  } catch (error) {
    return res
      .status(500)
      .send({ error: "error in updation", msg: error.message });
  }
});

const PORT = 4000;
const hostname = "localhost";
app.listen(PORT, hostname, () => {
  console.log(`server is runnig on http://${hostname}:${PORT}`);
  connectDB();
});
