const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    manager_id: String,
    manager_name: String,
    manager_contact: String,
    manager_contact2: String,
    personalmemo: String,
    user_level: Number,
    enabled: Number,
  },
  { collaction: "Members" }
);

const Member = mongoose.model("Member", memberSchema);

module.exports = { Member };
