var express = require("express");
var router = express.Router();
const { Company } = require("../Model/Company.js");

//고객사리스트
router.post("/companylist", (req, res) => {
  let limit = 10;
  if (req.body.searchTerm != "") limit = 0;
  Company.find({
    $and: [
      { com_name_alias: { $regex: req.body.searchTerm } },
      { manager_id: { $regex: req.body.manager } },
    ],
  })
    .skip(req.body.skip)
    .limit(limit)
    .exec()
    .then(doc => {
      res.status(200).json({ success: true, companyList: doc });
    })
    .catch(err => {
      res.status(400).json({ success: false });
    });
});

//고객사리스트(광고업로드용)
router.post("/adcompany", (req, res) => {
  Company.find({
    $or: [{ com_name_alias: { $regex: req.body.searchTerm } }],
  })
    .exec()
    .then(doc => {
      res.status(200).json({ success: true, companyList: doc });
    })
    .catch(err => {
      res.status(400).json({ success: false });
    });
});

router.post("/partnercom", (req, res) => {
  let limit = 10;
  console.log(req.body.searchTerm);
  Company.find({ manager_id: { $regex: req.body.searchTerm } })
    .limit(limit)
    .exec()
    .then(doc => {
      res.status(200).json({ success: true, companyList: doc });
    })
    .catch(err => {
      res.status(400).json({ success: false });
    });
});

//고객사리스트
router.post("/companymanager", (req, res) => {
  let limit = 10;
  if (req.body.searchTerm != "") limit = 0;
  Company.find({
    $or: [{ manager_id: { $regex: req.body.searchTerm } }],
  })
    .skip(req.body.skip)
    .limit(limit)
    .exec()
    .then(doc => {
      res.status(200).json({ success: true, companyList: doc });
    })
    .catch(err => {
      res.status(400).json({ success: false });
    });
});

//고객사명 검색
router.post("/companysearch", (req, res) => {
  Company.findOne({
    $or: [{ com_code: { $regex: req.body.searchTerm } }],
  })
    .exec()
    .then(doc => {
      res.status(200).json({ success: true, companyName: doc });
    })
    .catch(err => {
      res.status(400).json({ success: false });
    });
});

//고객사 상세
router.post("/companydetail", (req, res) => {
  Company.findOne({ com_code: req.body.com_code })
    .exec()
    .then(doc => {
      res.status(200).json({ success: true, company: doc });
    })
    .catch(err => {
      res.status(400).json({ success: false });
    });
});

//일정 시작
router.post("/start", (req, res) => {
  let temp = {
    ad_start: req.body.start,
    ad_end: req.body.end,
    care_use: req.body.care,
    multi_ad: req.body.multi,
    ad_stat: req.body.stat,
    partner: req.body.partner,
    ad_num: req.body.num,
  };
  Company.updateOne({ com_code: req.body.com_code }, { $set: temp })
    .exec()
    .then(doc => {
      res.status(200).json({ success: true });
    })
    .catch(err => {
      res.status(400).json({ success: false });
    });
});

module.exports = router;
