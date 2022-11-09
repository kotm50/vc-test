const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    com_code: String,
    com_category: String,
    com_name: String,
    com_name_alias: String,
    com_area: String,
    com_db: String,
    com_manager: String,
    com_contact: String,
    com_ad_img: String,
    com_resource: String,
    com_addr_img: String,
    manager_id: String,
    com_proceed: Number,
    com_originaldata: String,
    com_script: String,
    com_feedback: String,
    ent_id: String,
    ad_manager_id: String,
    start_date: String,
    end_date: String,
    care_use: String, // 케어서비스 이용여부
    multi_ad: String, // 추가광고 이용여부
    ad_start: Number, // 광고 시작일
    ad_end: Number, // 광고 종료일
    ad_num: Number, // 광고 횟수
    partner: String,
  },
  { collaction: "Companies", timestamps: true }
);

const Company = mongoose.model("Company", companySchema);

module.exports = { Company };
