const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
  {
    AdminNum: Number,
    email: String,
  },
  { collaction: "Admins" }
);

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = { Admin };
