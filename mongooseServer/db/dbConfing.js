const mongoose = require("mongoose");
const URL = "mongodb://127.0.0.1:27017";
const databaseName = "mongooseODM";
const dbConnect = async () => {
  try {
    await mongoose.connect(`${URL}/${databaseName}`);
    console.log("database connected");
  } catch (err) {
    console.log("error in database connection", err.message);
  }
};
module.exports = { dbConnect };
