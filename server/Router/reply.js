var express = require("express");
var router = express.Router();
const { Post } = require("../Model/Post.js");
const { Reply } = require("../Model/Reply.js");
const { User } = require("../Model/User.js");

router.post("/submit", (req, res) => {
  let temp = {
    reply: req.body.reply,
    postId: req.body.postId,
  };

  User.findOne({ uid: req.body.uid })
    .exec()
    .then(userInfo => {
      temp.author = userInfo._id;
      const NewReply = new Reply(temp);
      NewReply.save(() => {
        Post.findOneAndUpdate(
          {
            _id: req.body.postId,
          },
          { $inc: { replyNum: 1 } }
        )
          .exec()
          .then(() => {
            return res.status(200).json({ success: true });
          });
      });
    })
    .catch(err => {
      return res.status(400).json({ success: false });
    });
});

router.post("/getReply", (req, res) => {
  Reply.find({ postId: req.body.postId })
    .populate("author")
    .exec()
    .then(replyInfo => {
      return res.status(200).json({
        success: true,
        replyList: replyInfo,
      });
    })
    .catch(err => {
      return res.status(400).json({
        success: false,
      });
    });
});

router.post("/edit", (req, res) => {
  let temp = {
    postId: req.body.postId,
    reply: req.body.reply,
    uid: req.body.uid,
  };
  Reply.findOneAndUpdate({ _id: req.body.replyId }, { $set: temp })
    .exec()
    .then(() => {
      return res.status(200).json({
        success: true,
      });
    })
    .catch(err => {
      return res.status(400).json({
        success: false,
      });
    });
});

router.post("/delete", (req, res) => {
  Reply.deleteOne({ _id: req.body.replyId })
    .exec()
    .then(() => {
      Post.findOneAndUpdate(
        {
          id: req.body.postId,
        },
        { $inc: { replyNum: -1 } }
      )
        .exec()
        .then(() => {
          return res.status(200).json({ success: true });
        });
    })
    .catch(err => {
      return res.status(400).json({
        success: false,
      });
    });
});

module.exports = router;
