import React, { useState, useEffect } from "react";
import {
  ListItem,
  ListItemDiv,
  MoreItem,
  Avatar,
} from "../../Style/ListCSS.js";
import noImage from "../../image/noimage.png";
import { Link } from "react-router-dom";
import CompanyName from "./CompanyName";
import dayjs from "dayjs";

function ApplyDetail(props) {
  const [Year, setYear] = useState(0);
  const [More, setMore] = useState(false);
  const MoreHandler = () => {
    setMore(More => !More);
  };
  let date = dayjs();
  useEffect(() => {
    setYear(date.format("YYYY"));
  }, [date]);
  return (
    <ListItem>
      <div className="grid" onClick={() => MoreHandler()}>
        <Avatar>
          {props.apply.apply_image ? (
            <img
              src={`http://millinienimg.godohosting.com/${props.apply.apply_image}`}
              alt=""
            />
          ) : (
            <img src={noImage} alt="" />
          )}
        </Avatar>
        <ListItemDiv>
          <CompanyName comCode={props.apply.com_code} className="code" />
          <div className="name">이름 : {props.apply.apply_name}</div>
          <div className="phone">연락처 : {props.apply.apply_contact}</div>
          <div className="birth">
            나이 :{" "}
            {props.apply.apply_snum.length === 8
              ? Year - Number(props.apply.apply_snum.substr(0, 4))
              : props.apply.apply_snum}{" "}
            세
          </div>
          {props.apply.apply_gender && (
            <div className="gender">
              성별 : {Number(props.apply.apply_gender) === 1 ? "남자" : "여자"}
            </div>
          )}
          {props.apply.apply_sex && (
            <div className="gender">
              성별 : {Number(props.apply.apply_sex) === 1 ? "남자" : "여자"}
            </div>
          )}
        </ListItemDiv>
      </div>
      {More && (
        <MoreItem>
          <div className="memo">
            <p
              style={{
                marginBottom: "5px",
                marginTop: "10px",
                fontWeight: "bold",
              }}
            >
              관리자메모
            </p>
            <pre>{props.apply.admin_memo}</pre>
          </div>
          <div className="btns">
            <Link
              to="#/"
              onClick={e => e.preventDefault()}
              className="btn btn-dark"
            >
              수정하기
            </Link>
            <Link
              to="#/"
              onClick={e => e.preventDefault()}
              className="btn btn-danger"
            >
              찐면접 양식
            </Link>
            <Link
              to="#/"
              onClick={e => e.preventDefault()}
              className="btn btn-danger"
            >
              찐면접 확인
            </Link>
            <Link
              to="#/"
              onClick={e => e.preventDefault()}
              className="btn btn-primary"
            >
              KoTi 양식(OB)
            </Link>
            <Link
              to="#/"
              onClick={e => e.preventDefault()}
              className="btn btn-primary"
            >
              KoTi 양식(대면)
            </Link>
            <Link
              to="#/"
              onClick={e => e.preventDefault()}
              className="btn btn-primary"
            >
              KoTi 확인
            </Link>
          </div>
        </MoreItem>
      )}
    </ListItem>
  );
}

export default ApplyDetail;
