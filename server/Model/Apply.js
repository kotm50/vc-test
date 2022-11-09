const mongoose = require("mongoose");

const applySchema = new mongoose.Schema(
  {
    com_code: { type: String, unique: true }, //고객사 코드
    apply_status: String, //현재 상태 ex)신규등록, 중복DB, 블랙리스트 등등
    interview_time: String, //면접 본 시간
    status_history: String, //상태 변화 이력
    admin_memo: String, // 메모
    interview_memo: String, //면접, 통화기록
    apply_name: String, // 이름
    apply_snum: String, //나이(생일)
    apply_gender: String, // 성별
    apply_contact: String, // 연락처
    apply_addr: String, // 거주지
    apply_memo: String, // 구직자가 남긴 메모
    apply_photo: Boolean, // 사진 여부
    apply_image: String, // 사진 url
    apply_unique: String, // 고유번호(담당자 번호)
    apply_path: String, // 지원경로 (알바몬, 알바천국, 텔레잡, etc)
    apply_koti: String, // KoTI 설문지(제작 예정) 답변지 내용
    secondary: String, // 2차관리 상태
    second_date: String, // 면접 등 일정발생시 날짜
    second_time: String, // 면접 등 일정발생시 시간(시)
    second_minute: String, // 면접 등 일정발생시 시간(분)
    second_result: String, // 면접 등 일정발생시 결과
    second_note: String,
    re_contact: String,
    stat_now: String,
    send: String,
    send_gift: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    applyNum: {
      type: Number,
      default: 0,
    },
  },
  { collaction: "Applies", timestamps: true }
);

const Apply = mongoose.model("Apply", applySchema);

module.exports = { Apply };
