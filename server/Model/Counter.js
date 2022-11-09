const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema(
  {
    name: String,
    postNum: Number,
    userNum: Number,
    applyNum: Number,
  },
  { collaction: "counter" }
);

const Counter = mongoose.model("Counter", counterSchema);

module.exports = { Counter };
