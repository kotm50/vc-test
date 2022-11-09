var express = require("express");
var router = express.Router();
var multer = require("multer");
var FTPStorage = require("multer-ftp");
const { Post } = require("../Model/Post.js");
const { Counter } = require("../Model/Counter.js");
const { User } = require("../Model/User.js");
const config = require("../config/key.js");

//글쓰기
router.post("/submit", (req, res) => {
  let temp = {
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
  };
  Counter.findOne({ name: "counter" })
    .exec()
    .then(counter => {
      temp.postNum = counter.postNum;
      User.findOne({ uid: req.body.uid })
        .exec()
        .then(userInfo => {
          temp.author = userInfo._id;
          const CommunityPost = new Post(temp);
          CommunityPost.save().then(() => {
            Counter.updateOne(
              { name: "counter" },
              { $inc: { postNum: 1 } }
            ).then(() => {
              res.status(200).json({ success: true });
            });
          });
        })
        .catch(err => {
          res.status(400).json({ success: false });
        });
    });
});

//리스트
router.post("/list", (req, res) => {
  let sort = {};
  if (req.body.sort === "최신순") {
    sort.createdAt = -1;
  } else {
    sort.replyNum = -1;
  }
  Post.find({
    $or: [
      { title: { $regex: req.body.searchTerm } },
      { content: { $regex: req.body.searchTerm } },
    ],
  })
    .populate("author")
    .sort(sort)
    .skip(req.body.skip)
    .limit(5)
    .exec()
    .then(doc => {
      res.status(200).json({ success: true, postList: doc });
    })
    .catch(err => {
      res.status(400).json({ success: false });
    });
});

//상세내용
router.post("/detail", (req, res) => {
  Post.findOne({ postNum: Number(req.body.postNum) })
    .populate("author")
    .exec()
    .then(doc => {
      res.status(200).json({ success: true, post: doc });
    })
    .catch(err => {
      res.status(400).json({ success: false });
    });
});

//수정
router.post("/edit", (req, res) => {
  let temp = {
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
  };
  Post.updateOne({ postNum: Number(req.body.postNum) }, { $set: temp })
    .exec()
    .then(doc => {
      res.status(200).json({ success: true });
    })
    .catch(err => {
      res.status(400).json({ success: false });
    });
});

//삭제
router.post("/delete", (req, res) => {
  Post.deleteOne({ postNum: Number(req.body.postNum) })
    .exec()
    .then(doc => {
      res.status(200).json({ success: true });
    })
    .catch(err => {
      res.status(400).json({ success: false });
    });
});

//이미지 업로드
const upload = multer({
  storage: new FTPStorage({
    basepath: "/path/ad",
    destination: function (req, file, options, callback) {
      let filename = file.originalname.split(".").pop();
      callback(null, `${Date.now()}` + "." + filename);
    },
    ftp: {
      host: config.ftpHOST,
      secure: false, // enables FTPS/FTP with TLS
      user: config.ftpUSER,
      password: config.ftpPWD,
    },
  }),
}).single("file");

router.post("/image/upload", (req, res, next) => {
  console.log(req);
  upload(req, res, err => {
    if (err) {
      res.status(400).json({ success: false });
    } else {
      res.status(200).json({ success: true, filePath: res.req.file.path });
    }
  });
});

module.exports = router;
