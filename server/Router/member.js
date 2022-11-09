var express = require("express");
var router = express.Router();
const { Member } = require("../Model/Member.js");

router.post("/name", (req, res) => {
  Member.findOne({ manager_id: { $regex: req.body.searchTerm } })
    .exec()
    .then(doc => {
      res.status(200).json({ success: true, manager_name: doc.manager_name });
    })
    .catch(err => {
      res.status(400).json({ success: false });
    });
});

module.exports = router;
