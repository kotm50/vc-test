import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge } from "react-bootstrap";
import UserList from "./UserList";
import dayjs from "dayjs";

import {
  UploadDiv,
  UploadButtonDiv,
  UploadForm,
} from "../../Style/UploadCSS.js";

import AddAd from "./AddAd";

function SecondaryStart() {
  let navigate = useNavigate();
  //로그인 여부 확인
  const user = useSelector(state => state.user);
  useEffect(() => {
    if (!user.accessToken) {
      alert("로그인 한 회원만 등록할 수 있습니다");
      navigate("/login");
    }
  });
  //고객사내용 불러오는 함수들
  let params = useParams();
  const [Now, setNow] = useState(0);
  const [Info, setInfo] = useState([]);
  const [Care, setCare] = useState("미이용");
  const [Multi, setMulti] = useState("싱글");
  const [Start, setStart] = useState("");
  const [End, setEnd] = useState("");
  const [Num, setNum] = useState(0);
  const [Stat, setStat] = useState(false);
  const [Partner, setPartner] = useState("");
  const [Image, setImage] = useState("");

  const inputCare = e => {
    setCare(e.target.value);
  };

  const inputMulti = e => {
    setMulti(e.target.value);
  };

  useEffect(() => {
    let body = {
      com_code: params.com_code,
    };
    axios.post("/api/secondary/companydetail", body).then(response => {
      if (response.data.success) {
        setInfo(response.data.company);
      }
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (Info.ad_start !== undefined) {
      setStart(Info.ad_start);
      setEnd(Info.ad_end);
      setCare(Info.care_use);
      setMulti(Info.multi_ad);
      setPartner(Info.partner);
      if (Start < Now < End) setStat(true);
      setNum(Info.ad_num);
    } else {
      setStart("불러오는 중입니다...");
      setEnd("");
    }
    // eslint-disable-next-line
  }, [Info]);

  let date = dayjs();

  const onSubmit = e => {
    e.preventDefault();
    setNow(date.format("YYYYMMDD"));
    if (Start === "" || End === "") {
      return alert("시작일, 종료일을 정확히 입력해 주세요");
    }
    if (Now >= End) {
      return alert("종료일이 오늘이거나 이전입니다. 확인해주세요");
    }
    let body = {};
    if (Stat) {
      body = {
        start: Start,
        end: End,
        care: Care,
        multi: Multi,
        partner: Partner,
        ad_img: Image,
        num: Num,
        com_code: params.com_code,
      };
    } else {
      body = {
        start: Start,
        end: End,
        care: Care,
        multi: Multi,
        partner: Partner,
        num: Num + 1,
        com_code: params.com_code,
      };
    }

    axios
      .post("/api/secondary/start", body)
      .then(response => {
        if (response.data.success) {
          alert("입력완료! 일정을 시작합니다");
          navigate("/secondary");
        } else {
          alert("오류가 발생했습니다! 관리자에게 문의해 주시기 바랍니다");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const codeHandler = e => {
    e.preventDefault();
    setPartner("");
  };
  return (
    <UploadDiv>
      <h4>
        {Info.com_name} {Info.com_area}
        <small
          style={{
            margin: "0 10px",
            fontWeight: "normal",
            color: "#666",
          }}
        >
          광고 진행 횟수 : {Num} 회
        </small>
        {Stat ? (
          <Badge bg="success">진행중</Badge>
        ) : (
          <Badge bg="secondary">미진행</Badge>
        )}
      </h4>
      <UploadForm>
        <div className="row">
          <div className="form-group col-12 col-md-6">
            <label htmlFor="start">
              시작일
              <small
                style={{
                  marginLeft: "10px",
                  fontWeight: "normal",
                  color: "#666",
                }}
              >
                8자리 숫자 (예: 2022년 10월 20일 - 20221020)
              </small>
            </label>
            <input
              type="text"
              id="start"
              value={Start}
              onChange={e => {
                setStart(e.currentTarget.value);
              }}
              className="form-control"
            ></input>
          </div>
          <div className="form-group col-12 col-md-6">
            <label htmlFor="end">
              종료일
              <small
                style={{
                  marginLeft: "10px",
                  fontWeight: "normal",
                  color: "#666",
                }}
              >
                8자리 숫자 (예: 2022년 10월 20일 - 20221020)
              </small>
            </label>
            <input
              type="text"
              id="end"
              value={End}
              onChange={e => {
                setEnd(e.currentTarget.value);
              }}
              className="form-control"
            ></input>
          </div>
          <div className="form-group col-12 col-md-6">
            <label htmlFor="care">케어서비스</label>
            <select
              id="care"
              className="form-select"
              onChange={inputCare}
              value={Care}
            >
              <option key="0" value="미이용">
                서비스 미이용
              </option>
              <option key="1" value="위촉케어">
                위촉케어
              </option>
              <option key="2" value="면접케어">
                면접케어
              </option>
              <option key="3" value="위촉+면접케어">
                위촉+면접케어
              </option>
            </select>
          </div>
          <div className="form-group col-12 col-md-6">
            <label htmlFor="multi">추가광고</label>
            <select
              id="multi"
              className="form-select"
              onChange={inputMulti}
              value={Multi}
            >
              <option key="0" value="미이용">
                싱글
              </option>
              <option key="1" value="더블">
                더블
              </option>
              <option key="2" value="트리플">
                트리플
              </option>
              <option key="3" value="콰트로">
                콰트로
              </option>
            </select>
          </div>

          <div className="form-group col-12 col-md-6 col-lg-4">
            <label>광고이미지 업로드</label>
            <AddAd setImage={setImage} comCode={params.com_code} />
          </div>

          <div className="form-group col-12 col-md-6 col-lg-6">
            <label htmlFor="com_code">담당파트너</label>
            {Partner === "" ? (
              <UserList setPartner={setPartner} />
            ) : (
              <div className="input-group">
                <input
                  id="name"
                  type="text"
                  className="form-control"
                  value={Partner}
                  disabled
                  style={{ marginBottom: 0 }}
                />
                <button
                  className="btn btn-danger"
                  onClick={e => codeHandler(e)}
                >
                  변경
                </button>
              </div>
            )}
          </div>
        </div>
      </UploadForm>

      <UploadButtonDiv>
        <button
          className="cancel"
          onClick={e => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          취소!
        </button>
        <button
          onClick={e => {
            onSubmit(e);
          }}
        >
          제출!
        </button>
      </UploadButtonDiv>
    </UploadDiv>
  );
}

export default SecondaryStart;
