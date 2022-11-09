import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";

function ApplyEdit(props) {
  const [Secondary, setSecondary] = useState("");
  const [Note, setNote] = useState("");
  const [AdminMemo, setAdminMemo] = useState("");
  const [ReContact, setReContact] = useState("");
  const [StatNow, setStatNow] = useState("");
  const [Send, setSend] = useState("");
  const [InterviewTime, setInterviewTime] = useState("");
  const [SendGift, setSendGift] = useState("");
  const [MoreBtn, setMoreBtn] = useState(false);
  const [More, setMore] = useState(false);

  let now = Number(dayjs().format("YYYYMMDD"));

  const MoreHandler = () => {
    if (props.AllOpen) {
      alert(
        `모든 세부내용이 열려있습니다\n"모든 세부내용 닫기" 버튼으로 닫아주세요`
      );
      setMore(true);
    } else {
      setMore(More => !More);
    }
  };

  useEffect(() => {
    if (props.apply.interview_time !== undefined) {
      if (props.apply.interview_time.slice(-1) === ":") {
        let i = props.apply.interview_time + "00";
        setInterviewTime(i);
      } else {
        setInterviewTime(props.apply.interview_time);
      }
    } else {
      setInterviewTime("미정");
    }
    if (props.apply.secondary !== undefined) {
      setSecondary(props.apply.secondary);
    } else {
      setSecondary("면접예정");
    }
    if (props.apply.second_note !== undefined) {
      setNote(props.apply.second_note);
    } else {
      setNote("");
    }
    if (props.apply.admin_memo !== undefined) {
      setAdminMemo(props.apply.admin_memo);
    } else {
      setAdminMemo("");
    }
    if (props.apply.re_contact !== undefined) {
      setReContact(props.apply.re_contact);
    } else {
      setReContact("");
    }
    if (props.apply.stat_now !== undefined) {
      setStatNow(props.apply.stat_now);
    } else {
      setStatNow("");
    }
    if (props.apply.send !== undefined) {
      setSend(props.apply.send);
    } else {
      setSend("");
    }
    if (props.apply.send_gift !== undefined) {
      setSendGift(props.apply.send_gift);
    } else {
      setSendGift("");
    }
    if (props.AllOpen) {
      setMore(true);
    } else {
      setMore(false);
    }
    // eslint-disable-next-line
  }, [
    now,
    props.apply.interview_time,
    props.AllDay,
    props.apply.secondary,
    props.apply.second_note,
    props.apply.admin_memo,
    props.apply.re_contact,
    props.apply.stat_now,
    props.apply.send,
    props.apply.send_gift,
    props.AllOpen,
  ]);
  const secondHandler = (a, b, c, d) => {
    if (a !== null) {
      if (a !== props.apply.secondary) {
        let body = {
          secondary: a,
          com_code: b,
          apply_name: c,
          apply_contact: d,
        };

        axios
          .post("/api/apply/second", body)
          .then(response => {
            if (response.data.success) {
              return;
            } else {
              alert("수정실패!");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  };
  const noteHandler = (a, b, c, d) => {
    if (Note !== null) {
      if (Note !== props.apply.second_note) {
        let body = {
          second_note: a,
          com_code: b,
          apply_name: c,
          apply_contact: d,
        };

        axios
          .post("/api/apply/secondnote", body)
          .then(response => {
            if (response.data.success) {
              return;
            } else {
              alert("수정실패!");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  };

  const memoHandler = (a, b, c, d) => {
    if (AdminMemo !== null) {
      if (AdminMemo !== props.apply.admin_memo) {
        let body = {
          admin_memo: a,
          com_code: b,
          apply_name: c,
          apply_contact: d,
        };

        axios
          .post("/api/apply/secondmemo", body)
          .then(response => {
            if (response.data.success) {
              return;
            } else {
              alert("수정실패!");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  };

  const recHandler = (a, b, c, d) => {
    if (ReContact !== null) {
      if (ReContact !== props.apply.re_contact) {
        let body = {
          re_contact: a,
          com_code: b,
          apply_name: c,
          apply_contact: d,
        };

        axios
          .post("/api/apply/recontact", body)
          .then(response => {
            if (response.data.success) {
              return;
            } else {
              alert("수정실패!");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  };

  const statHandler = (a, b, c, d) => {
    if (StatNow !== null) {
      if (StatNow !== props.apply.stat_now) {
        let body = {
          stat_now: a,
          com_code: b,
          apply_name: c,
          apply_contact: d,
        };

        axios
          .post("/api/apply/statnow", body)
          .then(response => {
            if (response.data.success) {
              return;
            } else {
              alert("수정실패!");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  };

  const sendHandler = (a, b, c, d) => {
    if (a !== null) {
      if (a !== props.apply.send) {
        let body = {
          send: a,
          com_code: b,
          apply_name: c,
          apply_contact: d,
        };

        axios
          .post("/api/apply/send", body)
          .then(response => {
            if (response.data.success) {
              return;
            } else {
              alert("수정실패!");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  };
  const giftHandler = (a, b, c, d) => {
    if (a !== null) {
      if (a !== props.apply.send_gift) {
        let body = {
          send_gift: a,
          com_code: b,
          apply_name: c,
          apply_contact: d,
        };

        axios
          .post("/api/apply/gift", body)
          .then(response => {
            if (response.data.success) {
              return;
            } else {
              alert("수정실패!");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  };
  return (
    <div className="list text-center my-2 w-100">
      <div className="row bg-light pb-2 mx-0 w-100">
        <div className="no col-1 ps-0">
          {props.idx === 0 && <h6 className="fw-bold pb-2">순서</h6>}
          {props.idx + 1}
        </div>

        <div className={props.CaptureIt ? "day col-3" : "day col-2"}>
          {props.idx === 0 && <h6 className="fw-bold pb-2">면접일시</h6>}
          {InterviewTime}
        </div>
        <div className={props.CaptureIt ? "name col-2" : "name col-1"}>
          {props.idx === 0 && <h6 className="fw-bold pb-2">이름</h6>}
          {props.apply.apply_name}
          {!props.apply.apply_name && "미입력"}
        </div>
        <div className="age col-1">
          {props.idx === 0 && <h6 className="fw-bold pb-2">나이</h6>}
          {props.apply.apply_snum ? (
            <span>
              {props.apply.apply_snum.length === 8
                ? props.Year - Number(props.apply.apply_snum.substr(0, 4)) + 1
                : props.apply.apply_snum}{" "}
              세
            </span>
          ) : (
            <span>불명</span>
          )}
        </div>

        <div className="gender col-1">
          {props.idx === 0 && <h6 className="fw-bold pb-2">성별</h6>}
          {props.apply.apply_gender ? (
            <span>
              {Number(props.apply.apply_gender) === 1 ? "남자" : "여자"}
            </span>
          ) : props.apply.apply_sex ? (
            <span>{props.apply.apply_sex}</span>
          ) : (
            "미입력"
          )}
        </div>
        <div className={props.CaptureIt ? "stat col-2" : "stat col-3"}>
          {props.idx === 0 && <h6 className="fw-bold pb-2">면접결과</h6>}
          {props.CaptureIt ? (
            <span>{Secondary}</span>
          ) : (
            <select
              className={props.idx === 0 ? "w-100" : "w-100 h-100"}
              style={props.idx === 0 ? { height: "25px" } : null}
              value={Secondary}
              onChange={e => {
                setSecondary(e.currentTarget.value);
                secondHandler(
                  e.currentTarget.value,
                  props.apply.com_code,
                  props.apply.apply_name,
                  props.apply.apply_contact
                );
              }}
            >
              <option key="00" value="면접예정">
                면접예정
              </option>
              <option key="01" value="면접취소">
                면접취소
              </option>
              <option key="02" value="면접포기">
                면접포기
              </option>
              <option key="03" value="보류">
                보류
              </option>
              <option key="04" value="불합격">
                불합격
              </option>
              <option key="05" value="입과">
                입과
              </option>
              <option key="06" value="입과포기">
                입과포기
              </option>
              <option key="07" value="입사거절">
                입사거절
              </option>
              <option key="08" value="입사포기">
                입사포기
              </option>
              <option key="09" value="지원취소">
                지원취소
              </option>
              <option key="10" value="지원포기">
                지원포기
              </option>
              <option key="11" value="진행중">
                진행중
              </option>
              <option key="12" value="탈락">
                탈락
              </option>
              <option key="13" value="합격">
                합격
              </option>
            </select>
          )}
        </div>
        <div className="note col-2 col-lg-2">
          {props.idx === 0 && <h6 className="fw-bold pb-2">비고</h6>}
          {props.CaptureIt ? (
            <span>{Note}</span>
          ) : (
            <input
              className={props.idx === 0 ? "w-100" : "w-100 h-100"}
              style={props.idx === 0 ? { height: "25px" } : null}
              type="text"
              value={Note}
              onChange={e => {
                setNote(e.currentTarget.value);
              }}
              onBlur={e => {
                noteHandler(
                  e.currentTarget.value,
                  props.apply.com_code,
                  props.apply.apply_name,
                  props.apply.apply_contact
                );
              }}
            />
          )}
        </div>
        <div
          className="more col-1"
          style={props.CaptureIt ? { display: "none" } : { display: "block" }}
        >
          {props.idx === 0 && <h6 className="fw-bold pb-2">세부내용</h6>}
          <div
            onMouseOver={e => {
              setMoreBtn(true);
            }}
            onMouseOut={e => {
              setMoreBtn(false);
            }}
          >
            {More || MoreBtn ? (
              <div
                className={
                  !More
                    ? "bg-primary text-white py-1"
                    : "bg-danger text-white py-1"
                }
                onClick={() => MoreHandler()}
              >
                {!More ? "더보기" : "닫기"}
              </div>
            ) : (
              <div
                style={{
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {AdminMemo ? <span>{AdminMemo}</span> : <span>없음</span>}
              </div>
            )}
          </div>
        </div>
      </div>
      {More || props.AllOpen ? (
        <div
          className="row py-2 pb-2 mx-0 w-100"
          style={
            props.CaptureIt ? { display: "none" } : { backgroundColor: "#ffc" }
          }
        >
          <div className="day col-2">
            <h6 className="fw-bold pb-2">연락처</h6>
            {props.apply.apply_contact}
          </div>
          <div className="rec col-2">
            <h6 className="fw-bold pb-2">재컨택</h6>
            <input
              className="w-100"
              type="text"
              value={ReContact}
              onChange={e => {
                setReContact(e.currentTarget.value);
              }}
              onBlur={e => {
                recHandler(
                  e.currentTarget.value,
                  props.apply.com_code,
                  props.apply.apply_name,
                  props.apply.apply_contact
                );
              }}
            />
          </div>
          <div className="now col-2">
            <h6 className="fw-bold pb-2">현재상태</h6>
            <input
              className="w-100"
              type="text"
              value={StatNow}
              onChange={e => {
                setStatNow(e.currentTarget.value);
              }}
              onBlur={e => {
                statHandler(
                  e.currentTarget.value,
                  props.apply.com_code,
                  props.apply.apply_name,
                  props.apply.apply_contact
                );
              }}
            />
          </div>
          <div className="send col-1">
            <h6 className="fw-bold pb-2">발송여부</h6>
            <select
              className="w-100"
              style={{ height: "25px" }}
              value={Send}
              onChange={e => {
                setSend(e.currentTarget.value);
                sendHandler(
                  e.currentTarget.value,
                  props.apply.com_code,
                  props.apply.apply_name,
                  props.apply.apply_contact
                );
              }}
            >
              <option key="00" value="미발송">
                미발송
              </option>
              <option key="01" value="발송완료">
                발송완료
              </option>
            </select>
          </div>
          <div className="now col-2">
            <h6 className="fw-bold pb-2">발송내용</h6>
            <input
              className="w-100"
              type="text"
              value={SendGift}
              onChange={e => {
                setSendGift(e.currentTarget.value);
              }}
              onBlur={e => {
                giftHandler(
                  e.currentTarget.value,
                  props.apply.com_code,
                  props.apply.apply_name,
                  props.apply.apply_contact
                );
              }}
            />
          </div>
          <div
            className="more col-3"
            style={props.CaptureIt ? { display: "none" } : { display: "block" }}
          >
            <h6 className="fw-bold pb-2">세부내용</h6>
            <textarea
              className="w-100"
              type="text"
              value={AdminMemo}
              onChange={e => {
                setAdminMemo(e.currentTarget.value);
              }}
              onBlur={e => {
                memoHandler(
                  e.currentTarget.value,
                  props.apply.com_code,
                  props.apply.apply_name,
                  props.apply.apply_contact
                );
              }}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ApplyEdit;
