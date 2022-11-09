import React, { useState, useEffect } from "react";
import ApplyDetail from "./ApplyDetail";
import { useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { SpinnerDiv } from "../../Style/PostDetailCSS.js";

function ApplyArea() {
  let params = useParams();

  const [ApplyInfo, setApplyInfo] = useState({});
  const [Flag, setFlag] = useState(false);

  useEffect(() => {
    let body = {
      applyNum: params.applyNum,
    };
    axios
      .post("/api/apply/detail", body)
      .then(response => {
        console.log(response);
        if (response.data.success) {
          setApplyInfo(response.data.apply);
          setFlag(true);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [params.applyNum]);
  return (
    <div>
      {Flag ? (
        <>
          <ApplyDetail ApplyInfo={ApplyInfo} />
        </>
      ) : (
        <SpinnerDiv>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </SpinnerDiv>
      )}
    </div>
  );
}

export default ApplyArea;
