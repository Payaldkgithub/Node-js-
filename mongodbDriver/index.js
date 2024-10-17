const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();
//middleware
app.use(express.json());
//demo Api
app.get("/", (req, res) => {
  res.send("hello world");
});

//create connection
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
let collection;
async function connectDb() {
  try {
    await client.connect();
    console.log("database connected");
    const db = client.db("ExpressMongo");
    collection = db.collection("c1");
  } catch {
    console.log("Error in database connection");
  }
}
app.post("/create", (req, res) => {
  try {
    let data = req.body;
    collection.insertOne(data);
    res.status(201).send({ message: "Data Stroed In DB" });
  } catch (error) {
    res.status(500).send({ error: "Something went wrong" });
  }
});

const PORT = 5000;
const hostname = "localhost";
app.listen(PORT, hostname, () => {
  console.log(`server is running in http://${hostname}:${PORT}`);
  connectDb();
});
