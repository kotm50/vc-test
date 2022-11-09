const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userNum: Number,
    email: String,
    displayName: String,
    uid: String,
    photoURL: Number,
  },
  { collaction: "Users" }
);

const User = mongoose.model("User", userSchema);

module.exports = { User };
