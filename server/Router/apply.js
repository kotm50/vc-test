var express = require("express");
var router = express.Router();
var multer = require("multer");
var FTPStorage = require("multer-ftp");
const { Apply } = require("../Model/Apply.js");
const { Counter } = require("../Model/Counter.js");
const { User } = require("../Model/User.js");
const config = require("../config/key.js");

//글쓰기
router.post("/submit", (req, res) => {
  let temp = {
    apply_name: req.body.name,
    apply_snum: req.body.birth,
    com_code: req.body.comCode,
    apply_contact: req.body.phone,
    admin_memo: req.body.memo,
    apply_image: req.body.image,
    apply_comCode: req.body.comCode,
    apply_gender: req.body.gender,
    apply_addr: req.body.address,
    apply_photo: req.body.photo,
    apply_path: req.body.path,
    secondary: req.body.secondary,
  };
  Counter.findOne({ name: "counter" })
    .exec()
    .then(counter => {
      temp.applyNum = counter.applyNum;
      User.findOne({ uid: req.body.uid })
        .exec()
        .then(userInfo => {
          temp.author = userInfo._id;
          const ApplyList = new Apply(temp);
          ApplyList.save().then(() => {
            Counter.updateOne(
              { name: "counter" },
              { $inc: { applyNum: 1 } }
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
    sort.createdAt = 1;
  }
  Apply.find({
    $or: [{ name: { $regex: req.body.searchTerm } }],
  })
    .populate("author")
    .sort(sort)
    .skip(req.body.skip)
    .limit(5)
    .exec()
    .then(doc => {
      res.status(200).json({ success: true, applyList: doc });
    })
    .catch(err => {
      res.status(400).json({ success: false });
    });
});

//상세내용
router.post("/detail", (req, res) => {
  Apply.findOne({ applyNum: Number(req.body.applyNum) })
    .populate("author")
    .exec()
    .then(doc => {
      res.status(200).json({ success: true, apply: doc });
    })
    .catch(err => {
      res.status(400).json({ success: false });
    });
});

//수정
router.post("/edit", (req, res) => {
  let temp = {
    apply_name: req.body.name,
    apply_snum: req.body.birth,
    com_code: req.body.comCode,
    apply_contact: req.body.phone,
    admin_memo: req.body.memo,
    apply_image: req.body.image,
    apply_comCode: req.body.comCode,
    apply_gender: req.body.gender,
    apply_addr: req.body.address,
    apply_photo: req.body.photo,
    apply_path: req.body.path,
  };
  Apply.updateOne({ postNum: Number(req.body.applyNum) }, { $set: temp })
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
  Apply.deleteOne({ postNum: Number(req.body.postNum) })
    .exec()
    .then(doc => {
      res.status(200).json({ success: true });
    })
    .catch(err => {
      res.status(400).json({ success: false });
    });
});

//이미지업로드
const upload = multer({
  storage: new FTPStorage({
    basepath: "/path/photo",
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
  upload(req, res, err => {
    if (err) {
      res.status(400).json({ success: false });
    } else {
      res.status(200).json({ success: true, filePath: res.req.file.path });
    }
  });
});

router.post("/comcode", (req, res) => {
  Apply.find({
    $or: [{ com_code: { $regex: req.body.searchTerm } }],
  })
    .then(doc => {
      res.status(200).json({ success: true, applyList: doc });
    })
    .catch(err => {
      res.status(400).json({ success: false });
    });
});

router.post("/comcodeapply", (req, res) => {
  Apply.find({
    $or: [{ com_code: { $regex: req.body.searchTerm } }],
  })
    .then(doc => {
      res.status(200).json({ success: true, applyList: doc });
    })
    .catch(err => {
      res.status(400).json({ success: false });
    });
});

router.post("/secondary", (req, res) => {
  Apply.find({
    $or: [{ com_code: { $regex: req.body.searchTerm } }],
  })
    .then(doc => {
      res.status(200).json({ success: true, applyList: doc });
    })
    .catch(err => {
      res.status(400).json({ success: false });
    });
});

router.post("/second", (req, res) => {
  let temp = {
    secondary: req.body.secondary,
  };
  Apply.updateOne(
    {
      $and: [
        {
          com_code: { $regex: req.body.com_code },
          apply_name: { $regex: req.body.apply_name },
          apply_contact: { $regex: req.body.apply_contact },
        },
      ],
    },
    { $set: temp }
  )
    .then(doc => {
      res.status(200).json({ success: true });
    })
    .catch(err => {
      res.status(400).json({ success: false });
    });
});
router.post("/secondnote", (req, res) => {
  let temp = {
    second_note: req.body.second_note,
  };
  Apply.updateOne(
    {
      $and: [
        {
          com_code: { $regex: req.body.com_code },
          apply_name: { $regex: req.body.apply_name },
          apply_contact: { $regex: req.body.apply_contact },
        },
      ],
    },
    { $set: temp }
  )
    .then(doc => {
      res.status(200).json({ success: true });
    })
    .catch(err => {
      res.status(400).json({ success: false });
    });
});

router.post("/secondmemo", (req, res) => {
  let temp = {
    admin_memo: req.body.admin_memo,
  };
  Apply.updateOne(
    {
      $and: [
        {
          com_code: { $regex: req.body.com_code },
          apply_name: { $regex: req.body.apply_name },
          apply_contact: { $regex: req.body.apply_contact },
        },
      ],
    },
    { $set: temp }
  )
    .then(doc => {
      res.status(200).json({ success: true });
    })
    .catch(err => {
      res.status(400).json({ success: false });
    });
});

router.post("/recontact", (req, res) => {
  let temp = {
    re_contact: req.body.re_contact,
  };
  Apply.updateOne(
    {
      $and: [
        {
          com_code: { $regex: req.body.com_code },
          apply_name: { $regex: req.body.apply_name },
          apply_contact: { $regex: req.body.apply_contact },
        },
      ],
    },
    { $set: temp }
  )
    .then(doc => {
      res.status(200).json({ success: true });
    })
    .catch(err => {
      res.status(400).json({ success: false });
    });
});

router.post("/statnow", (req, res) => {
  console.log(req.body);
  let temp = {
    stat_now: req.body.stat_now,
  };
  Apply.updateOne(
    {
      $and: [
        {
          com_code: { $regex: req.body.com_code },
          apply_name: { $regex: req.body.apply_name },
          apply_contact: { $regex: req.body.apply_contact },
        },
      ],
    },
    { $set: temp }
  )
    .then(doc => {
      res.status(200).json({ success: true });
    })
    .catch(err => {
      res.status(400).json({ success: false });
    });
});

router.post("/send", (req, res) => {
  let temp = {
    send: req.body.send,
  };
  Apply.updateOne(
    {
      $and: [
        {
          com_code: { $regex: req.body.com_code },
          apply_name: { $regex: req.body.apply_name },
          apply_contact: { $regex: req.body.apply_contact },
        },
      ],
    },
    { $set: temp }
  )
    .then(doc => {
      res.status(200).json({ success: true });
    })
    .catch(err => {
      res.status(400).json({ success: false });
    });
});

router.post("/gift", (req, res) => {
  let temp = {
    send_gift: req.body.send_gift,
  };
  Apply.updateOne(
    {
      $and: [
        {
          com_code: { $regex: req.body.com_code },
          apply_name: { $regex: req.body.apply_name },
          apply_contact: { $regex: req.body.apply_contact },
        },
      ],
    },
    { $set: temp }
  )
    .then(doc => {
      res.status(200).json({ success: true });
    })
    .catch(err => {
      res.status(400).json({ success: false });
    });
});

router.post("/dummy", (req, res) => {
  Apply.find({ apply_name: { $exists: false } })
    .then(doc => {
      res.status(200).json({ success: true, dummyList: doc });
    })
    .catch(err => {
      res.status(400).json({ success: false });
    });
});

router.post("/deletedummy", (req, res) => {
  Apply.deleteMany({ apply_name: { $exists: false } })
    .exec()
    .then(doc => {
      res.status(200).json({ success: true });
    })
    .catch(err => {
      res.status(400).json({ success: false });
    });
});

module.exports = router;
