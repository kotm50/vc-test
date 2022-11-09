import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import List from "./SecondaryList.js";
import axios from "axios";

import SecondHeader from "./SecondHeader";
import { SecondDiv, FooterDiv } from "../../Style/MainPageCSS.js";
import { DropdownButton, Dropdown } from "react-bootstrap";

function Secondary() {
  let params = useParams();
  const [SecondaryList, setSecondaryList] = useState([]);
  const [SearchTerm, setSearchTerm] = useState("");
  const [Skip, setSkip] = useState(0);
  const [LoadMore, setLoadMore] = useState(true);
  const [havApply, setHavApply] = useState(false);

  const getLoadMore = () => {
    let body = {
      searchTerm: SearchTerm,
      manager: params.manager_id,
      skip: Skip,
    };
    axios
      .post("/api/secondary/companylist", body)
      .then(function (response) {
        if (response.data.success) {
          setSecondaryList([...SecondaryList, ...response.data.companyList]);
          setSkip(Skip + response.data.companyList.length);
          if (response.data.companyList.length < 10) {
            setLoadMore(false);
          }
        }
      })
      .catch(function (error) {
        alert("요청실패");
        console.log(error);
      })
      .then(function () {});
    console.log(SecondaryList);
  };

  const getSecondaryList = () => {
    setSkip(0);
    let body = {
      searchTerm: SearchTerm,
      manager: params.manager_id,
      skip: Skip,
    };
    axios
      .post("/api/secondary/companylist", body)
      .then(function (response) {
        if (response.data.success) {
          setSecondaryList([...response.data.companyList]);
          setSkip(response.data.companyList.length);
          if (response.data.companyList.length < 10) {
            setLoadMore(false);
          }
        }
      })
      .catch(function (error) {
        alert("요청실패");
        console.log(error);
      })
      .then(function () {});
    console.log(SecondaryList);
  };

  useEffect(() => {
    setSearchTerm("");
    getSecondaryList();
    // eslint-disable-next-line
  }, []);
  /*
  const SearchHandler = () => {
    getSecondaryList();
  };
  */
  return (
    <div>
      <SecondDiv>
        <SecondHeader All={false} />

        <div className="search input-group my-2 p-3 bg-white">
          현재 '전체보기'에서만 고객사 번호 검색이 가능합니다.
          <br />
          이 페이지에서 고객사 번호 검색을 하시려면 CTRL+F를 이용해주세요 <br />
          만일 검색이 안되면 화면 하단의 '더 불러오기'를 누르고 다시 검색해
          주세요
        </div>
        <div>
          <DropdownButton variant="primary" title="지원자">
            <Dropdown.Item onClick={() => setHavApply(true)}>
              지원자 있음
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setHavApply(false)}>
              전체 고객사
            </Dropdown.Item>
          </DropdownButton>
        </div>
      </SecondDiv>
      <List SecondaryList={SecondaryList} havApply={havApply} />
      {LoadMore && (
        <FooterDiv>
          <button
            style={{ marginBottom: "10vh" }}
            onClick={() => getLoadMore()}
            className="btn btn-primary py-2"
          >
            더 불러오기
          </button>
        </FooterDiv>
      )}
    </div>
  );
}

export default Secondary;
