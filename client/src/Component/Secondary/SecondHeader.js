import React from "react";
import { Link } from "react-router-dom";
import { SecondNav } from "../../Style/MainPageCSS.js";

function SecondHeader(props) {
  return (
    <SecondNav>
      <Link
        className={
          props.Selected === 0 ? "btn btn-primary" : "btn btn-outline-primary"
        }
        to={`/secondaryall`}
      >
        전체보기
      </Link>
      <Link
        className={
          props.Selected === 1 ? "btn btn-primary" : "btn btn-outline-primary"
        }
        to={`/secondary/s1010`}
        onMouseUp={e => {
          if (!props.All) {
            setTimeout(() => {
              window.location.reload();
            }, 500);
          }
        }}
      >
        01. 가혜주임
      </Link>
      <Link
        className={
          props.Selected === 2 ? "btn btn-primary" : "btn btn-outline-primary"
        }
        to={`/secondary/s2025`}
        onMouseUp={e => {
          if (!props.All) {
            setTimeout(() => {
              window.location.reload();
            }, 500);
          }
        }}
      >
        02. 한솔주임
      </Link>
      <Link
        className={
          props.Selected === 3 ? "btn btn-primary" : "btn btn-outline-primary"
        }
        to={`/secondary/프리미엄`}
        onMouseUp={e => {
          if (!props.All) {
            setTimeout(() => {
              window.location.reload();
            }, 500);
          }
        }}
      >
        03. 윤주사원
      </Link>
      <Link
        className={
          props.Selected === 4 ? "btn btn-primary" : "btn btn-outline-primary"
        }
        to={`/secondary/s1019`}
        onMouseUp={e => {
          if (!props.All) {
            setTimeout(() => {
              window.location.reload();
            }, 500);
          }
        }}
      >
        04. 동민사원
      </Link>
      <Link
        className={
          props.Selected === 5 ? "btn btn-primary" : "btn btn-outline-primary"
        }
        to={`/secondary/s2014`}
        onMouseUp={e => {
          if (!props.All) {
            setTimeout(() => {
              window.location.reload();
            }, 500);
          }
        }}
      >
        05. 윤서사원
      </Link>
      <Link
        className={
          props.Selected === 6 ? "btn btn-primary" : "btn btn-outline-primary"
        }
        to={`/secondary/cs01`}
        onMouseUp={e => {
          if (!props.All) {
            setTimeout(() => {
              window.location.reload();
            }, 500);
          }
        }}
      >
        06. 대기사원
      </Link>
      <Link
        className={
          props.Selected === 7 ? "btn btn-primary" : "btn btn-outline-primary"
        }
        to={`/secondary/s1008`}
        onMouseUp={e => {
          if (!props.All) {
            setTimeout(() => {
              window.location.reload();
            }, 500);
          }
        }}
      >
        07. 대기사원
      </Link>
      <Link
        className={
          props.Selected === 8 ? "btn btn-primary" : "btn btn-outline-primary"
        }
        to={`/secondary/s2021`}
        onMouseUp={e => {
          if (!props.All) {
            setTimeout(() => {
              window.location.reload();
            }, 500);
          }
        }}
      >
        08. 신입사원
      </Link>
      <Link
        className={
          props.Selected === 9 ? "btn btn-primary" : "btn btn-outline-primary"
        }
        to={`/secondary/s1005`}
        onMouseUp={e => {
          if (!props.All) {
            setTimeout(() => {
              window.location.reload();
            }, 500);
          }
        }}
      >
        32. 대기고객사
      </Link>
    </SecondNav>
  );
}

export default SecondHeader;
