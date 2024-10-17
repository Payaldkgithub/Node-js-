const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: String,
  mobile: { type: String, unique: true },
  password: { type: String },
  address: {
    PIN: Number,
    city: String,
    state: String,
  },
});
const userModel = mongoose.model("user", userSchema);
module.exports = { userModel };
