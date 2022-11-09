import React, { useEffect, useState } from "react";
import { ApplyDiv, ApplyButtonDiv, ApplyForm } from "../../Style/ApplyCSS.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ImageUpload from "../Post/ImageUpload.js";
import CompanyList from "./CompanyList";

function ApplyInput() {
  const user = useSelector(state => state.user);
  let navigate = useNavigate();

  const [Name, setName] = useState("");
  const [Birth, setBirth] = useState("");
  const [Phone, setPhone] = useState("");
  const [Memo, setMemo] = useState("");
  const [Image, setImage] = useState("");
  const [ComCode, setComCode] = useState("");
  const [Gender, setGender] = useState(0);
  const [Address, setAddress] = useState("");
  const [Path, setPath] = useState("");
  const [Career, setCareer] = useState("");
  const [Photo, setPhoto] = useState(false);

  const [CompanyName, setCompanyName] = useState("");

  const inputGender = e => {
    setGender(e.target.value);
  };
  const inputPath = e => {
    setPath(e.target.value);
  };
  const inputCareer = e => {
    setCareer(e.target.value);
  };

  const chkBirth = () => {
    if (Birth !== "") {
      if (Birth.length !== 2) {
        setBirth("");
        return alert("연령을 정확히 입력하세요 예) 21세 : 21");
      }
      if (Number(Birth) < 19) {
        setBirth("");
        return alert("미성년자는 업무가 불가능합니다");
      }
    }
  };

  useEffect(() => {
    if (!user.accessToken) {
      alert("로그인 한 회원만 등록할 수 있습니다");
      navigate("/login");
    }
    /*
    if (Number(user.photoURL) !== 0) {
      alert("권한이 부족합니다, 관리자에게 문의해 주세요");
      navigate("/");
    }
    */
  });

  useEffect(() => {
    if (Image) {
      setPhoto(true);
    }
  }, [Image]);

  useEffect(() => {
    if (ComCode) {
      companySearch(ComCode);
    }
  }, [ComCode]);

  const companySearch = c => {
    let body = {
      searchTerm: c,
    };
    axios
      .post("/api/secondary/companysearch", body)
      .then(function (response) {
        if (response.data.success) {
          setCompanyName(
            response.data.companyName.com_name +
              " - " +
              response.data.companyName.com_area
          );
        }
      })
      .catch(function (error) {
        alert("요청실패");
        console.log(error);
      })
      .then(function () {});
  };

  const onSubmit = e => {
    e.preventDefault();
    let body = {
      name: Name,
      birth: Birth,
      phone: Phone,
      memo: Memo,
      image: Image,
      comCode: ComCode,
      gender: Gender,
      address: Address,
      photo: Photo,
      uid: user.uid,
      path: Path,
      career: Career,
      secondary: "신규지원",
    };
    axios
      .post("/api/apply/submit", body)
      .then(response => {
        if (response.data.success) {
          alert("작성완료!");
          navigate("/apply");
        } else {
          alert("작성실패!");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const codeHandler = e => {
    e.preventDefault();
    setComCode("");
  };

  return (
    <ApplyDiv className="container">
      <ApplyForm>
        <div className="row">
          <div className="form-group col-12 col-md-6 col-lg-6">
            <label htmlFor="com_code">지원고객사</label>
            {ComCode === "" ? (
              <CompanyList setComCode={setComCode} />
            ) : (
              <div className="input-group">
                <input
                  id="name"
                  type="text"
                  className="form-control"
                  value={CompanyName}
                  disabled
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
          <div className="form-group col-12 col-md-6 col-lg-6">
            <label htmlFor="path">지원경로</label>
            <select
              id="path"
              className="form-select"
              onChange={inputPath}
              value={Path}
            >
              <option key="" value="">
                지원경로를 선택해주세요
              </option>
              <option key="0000" value="텔레잡">
                텔레잡
              </option>
              <option key="0001" value="몬(로컬)">
                몬(로컬)
              </option>
              <option key="0002" value="몬(줄)">
                몬(줄)
              </option>
              <option key="0003" value="몬(문자)">
                몬(문자)
              </option>
              <option key="0004" value="몬(챗봇)">
                몬(챗봇)
              </option>
              <option key="0005" value="천국(스마트)">
                천국(스마트)
              </option>
              <option key="0006" value="천국(로컬)">
                천국(로컬)
              </option>
              <option key="0007" value="천국(줄)">
                천국(줄)
              </option>
              <option key="0008" value="천국(문자)">
                천국(문자)
              </option>
              <option key="0009" value="천국(챗봇)">
                천국(챗봇)
              </option>
              <option key="0010" value="전화">
                전화
              </option>
              <option key="0011" value="기타">
                기타
              </option>
              <option key="0012" value="기타(챗봇)">
                기타(챗봇)
              </option>
            </select>
          </div>
          <div className="form-group col-12 col-md-6 col-lg-4">
            <label htmlFor="name">이름</label>
            <input
              id="name"
              type="text"
              className="form-control"
              value={Name}
              onChange={e => {
                setName(e.currentTarget.value);
              }}
            />
          </div>
          <div className="form-group col-12 col-md-6 col-lg-4">
            <label htmlFor="birth">
              나이
              <small
                style={{
                  marginLeft: "10px",
                  fontWeight: "normal",
                  color: "#666",
                }}
              >
                숫자만 적어주세요 (예) 21세 = 21)
              </small>
            </label>
            <input
              id="birth"
              type="text"
              className="form-control"
              value={Birth}
              onChange={e => {
                setBirth(e.currentTarget.value);
              }}
              onBlur={e => {
                chkBirth();
              }}
            />
          </div>
          <div className="form-group col-12 col-md-6 col-lg-4">
            <label htmlFor="gender">성별</label>
            <select
              id="gender"
              className="form-select"
              onChange={inputGender}
              value={Gender}
            >
              <option key="2" value="2">
                성별을 선택해 주세요
              </option>
              <option key="0" value="0">
                여자
              </option>
              <option key="1" value="1">
                남자
              </option>
            </select>
          </div>
          <div className="form-group col-12 col-md-6 col-lg-4">
            <label htmlFor="address">거주지</label>
            <input
              id="address"
              type="text"
              className="form-control"
              value={Address}
              onChange={e => {
                setAddress(e.currentTarget.value);
              }}
            />
          </div>
          <div className="form-group col-12 col-md-6 col-lg-4">
            <label htmlFor="phone">연락처</label>
            <input
              id="phone"
              type="text"
              className="form-control"
              value={Phone}
              onChange={e => {
                setPhone(e.currentTarget.value);
              }}
            />
          </div>
          <div className="form-group col-12 col-md-6 col-lg-4">
            <label>사진(준비중)</label>
            <ImageUpload setImage={setImage} />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-12 col-md-6">
            <label htmlFor="career">경력사항</label>
            <select
              id="career"
              className="form-select"
              onChange={inputCareer}
              value={Career}
            >
              <option key="2" value="-1">
                경력사항을 선택해 주세요
              </option>
              <option key="0" value="0">
                신입
              </option>
              <option key="1" value="1">
                경력
              </option>
            </select>
          </div>

          <div className="form-group col-12 col-md-6">
            <label htmlFor="career1">세부경력</label>
            {Career > 0 ? (
              <select
                id="career1"
                className="form-select"
                onChange={inputCareer}
                value={Career}
              >
                <option key="04" value="999">
                  경력 내용을 선택하세요
                </option>
                <option key="00" value="6">
                  생명보험
                </option>
                <option key="01" value="7">
                  화재보험
                </option>
                <option key="02" value="8">
                  TM경력
                </option>
                <option key="03" value="9">
                  기타
                </option>
              </select>
            ) : (
              <select
                id="career1"
                className="form-select"
                onChange={inputCareer}
                value={Career}
                disabled
              >
                <option key="4" value="999">
                  경력자라면 경력사항에 '경력'을 선택하세요
                </option>
                <option key="0" value="6">
                  생명보험
                </option>
                <option key="1" value="7">
                  화재보험
                </option>
                <option key="2" value="8">
                  TM경력
                </option>
                <option key="3" value="9">
                  기타
                </option>
              </select>
            )}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="memo">메모</label>
          <textarea
            id="memo"
            value={Memo}
            className="form-control"
            onChange={e => {
              setMemo(e.currentTarget.value);
            }}
          />
        </div>
        <ApplyButtonDiv>
          <button
            onClick={e => {
              onSubmit(e);
            }}
          >
            제출!
          </button>
        </ApplyButtonDiv>
      </ApplyForm>
    </ApplyDiv>
  );
}

export default ApplyInput;
