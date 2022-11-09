var express = require("express");
var router = express.Router();
const { User } = require("../Model/User.js");
// const { Admin } = require("../Model/Admin.js");
const { Counter } = require("../Model/Counter.js");

router.post("/register", (req, res) => {
  let temp = req.body;
  Counter.findOne({ name: "counter" })
    .then(doc => {
      temp.userNum = doc.userNum;
      const userData = new User(req.body);
      userData.save().then(() => {
        Counter.updateOne({ name: "counter" }, { $inc: { userNum: 1 } }).then(
          () => {
            res.status(200).json({ success: true });
          }
        );
      });
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ success: false });
    });
});

router.post("/emailcheck", (req, res) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then(doc => {
      let check = true;
      if (doc) {
        check = false;
      }
      res.status(200).json({ success: true, check });
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ success: false });
    });
});

router.post("/search", (req, res) => {
  User.find({
    $and: [{ displayName: { $regex: req.body.searchTerm } }, { photoURL: 1 }],
  })
    .exec()
    .then(doc => {
      console.log(doc);
      res.status(200).json({ success: true, userList: doc });
    })
    .catch(err => {
      res.status(400).json({ success: false });
    });
});

module.exports = router;
