const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

const connectDB = async () => {
  try{
    await client.connect();
    console.log("db connected")
    let db=client.db("MongoDriver")
    return db
  }
  catch(error){
    console.log("error in database connection",error.message);
  }

};
module.exports = { connectDB };
