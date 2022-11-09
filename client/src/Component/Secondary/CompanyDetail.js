import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
/*
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
*/

import { Badge } from "react-bootstrap";
import dayjs from "dayjs";

import { UploadDiv } from "../../Style/UploadCSS.js";
import Applies from "./Applies";

function CompanyDetail() {
  /*
  let navigate = useNavigate();

 /*
  //로그인 여부 확인
  const user = useSelector(state => state.user);
  useEffect(() => {
    if (!user.accessToken) {
      alert("로그인 한 회원만 등록할 수 있습니다");
      navigate("/login");
    }
  });
  */

  //고객사내용 불러오는 함수들
  let params = useParams();
  const [Now, setNow] = useState(0);
  const [Num, setNum] = useState(0);
  const [Info, setInfo] = useState(0);
  const [Stat, setStat] = useState(false);

  useEffect(() => {
    let body = {
      com_code: params.com_code,
    };
    axios.post("/api/secondary/companydetail", body).then(response => {
      if (response.data.success) {
        setInfo(response.data.company);
        setNow(date.format("YYYYMMDD"));
        if (response.data.company.ad_start) {
          if (
            response.data.company.ad_start <
            Now <
            response.data.company.ad_end
          ) {
            setStat(true);
          }
        }
        setNum(response.data.company.ad_num);
      }
    });
    // eslint-disable-next-line
  }, []);
  let date = dayjs();
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
      <Applies comCode={params.com_code} />
    </UploadDiv>
  );
}

export default CompanyDetail;
