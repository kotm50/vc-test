import React, { useState, useEffect } from "react";
import { SecondListItem, SecondListItemDiv } from "../../Style/ListCSS.js";
import { Link } from "react-router-dom";
import axios from "axios";
import { Badge } from "react-bootstrap";
import dayjs from "dayjs";

function SecondaryDetail(props) {
  const [Apply, setApply] = useState(0);
  const [Applies, setApplies] = useState([]);
  const [Now, setNow] = useState(0);
  const [Partner, setPartner] = useState([]);
  let date = dayjs();
  useEffect(() => {
    setNow(date.format("YYYYMMDD"));
    // eslint-disable-next-line
  }, []);

  const getApplyList = () => {
    let body = {
      searchTerm: props.Secondary.com_code,
    };
    axios
      .post("/api/apply/comcode", body)
      .then(function (response) {
        if (response.data.success) {
          setApply(response.data.applyList.length);
          setApplies([...Applies, ...response.data.applyList]);
        }
      })
      .catch(function (error) {
        alert("요청실패");
        console.log(error);
      })
      .then(function () {});
  };

  const getPartnerName = () => {
    let body = {
      searchTerm: props.Secondary.manager_id,
    };
    axios
      .post("/api/member/name", body)
      .then(function (response) {
        if (response.data.success) {
          setPartner(response.data.manager_name);
        }
      })
      .catch(function (error) {
        alert("요청실패");
        console.log(error);
      })
      .then(function () {});
  };

  useEffect(() => {
    getApplyList();
    getPartnerName();
    // eslint-disable-next-line
  }, []);
  return (
    <SecondListItem
      style={
        props.havApply && Apply === 0
          ? { display: "none" }
          : { display: "block" }
      }
    >
      <SecondListItemDiv>
        <h5 className="name">
          {props.Secondary.com_name} {props.Secondary.com_area}{" "}
          {Number(props.Secondary.start_date.replaceAll("-", "")) <
          Now <
          Number(props.Secondary.end_date.replaceAll("-", "")) ? (
            <Badge pill bg="success">
              진행중
            </Badge>
          ) : (
            <Badge pill bg="secondary">
              미진행
            </Badge>
          )}
        </h5>
        <div className="row">
          <div className="col-12 col-md-6 col-lg-6">
            <div className="apply">지원자수 : {Apply} 명</div>
            <div className="period">
              {props.Secondary.ad_start ? (
                <span>
                  <strong>{props.Secondary.ad_start}</strong> ~
                  <strong>{props.Secondary.ad_end}</strong>
                </span>
              ) : (
                <span>미진행</span>
              )}
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-6">
            <div className="care">
              {props.Secondary.care_use ? (
                <span>
                  {props.Secondary.care_use === "위촉케어" && (
                    <Badge>위촉케어</Badge>
                  )}
                  {props.Secondary.care_use === "면접케어" && (
                    <Badge pill bg="success">
                      면접케어
                    </Badge>
                  )}
                  {props.Secondary.care_use === "위촉+면접케어" && (
                    <>
                      <Badge pill bg="primary">
                        위촉케어
                      </Badge>{" "}
                      <Badge pill bg="success">
                        면접케어
                      </Badge>
                    </>
                  )}
                </span>
              ) : (
                <Badge pill bg="black">
                  케어서비스 없음
                </Badge>
              )}
            </div>
            <div className="multi">
              {props.Secondary.multi_ad ? (
                <span>
                  {props.Secondary.multi_ad === "더블" && (
                    <Badge pill bg="success">
                      더블
                    </Badge>
                  )}
                  {props.Secondary.multi_ad === "트리플" && (
                    <Badge pill bg="warning" text="dark">
                      트리플
                    </Badge>
                  )}
                  {props.Secondary.multi_ad === "콰트로" && (
                    <Badge pill bg="danger">
                      콰트로
                    </Badge>
                  )}
                </span>
              ) : (
                <Badge pill bg="light" text="dark">
                  싱글
                </Badge>
              )}
            </div>
          </div>
          <div className="row col-12 col-md-12 col-lg-6">
            파트너 : {Partner}
          </div>
        </div>
        <div className="row">
          <div className="text-end">
            <Link
              to={`/applies/${props.Secondary.com_code}`}
              className="btn btn-primary"
              style={{ margin: "0 5px" }}
            >
              지원자 보기
            </Link>
            <Link
              to={`/start/${props.Secondary.com_code}`}
              className="btn btn-success"
            >
              일정시작하기
            </Link>
          </div>
        </div>
      </SecondListItemDiv>
    </SecondListItem>
  );
}

export default SecondaryDetail;
