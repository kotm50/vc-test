import React, { useState, useEffect } from "react";
import List from "./SecondaryList.js";
import axios from "axios";

import SecondHeader from "./SecondHeader";
import { SecondDiv, FooterDiv } from "../../Style/MainPageCSS.js";
import { DropdownButton, Dropdown } from "react-bootstrap";

function Secondary() {
  const [SecondaryList, setSecondaryList] = useState([]);
  const [SearchTerm, setSearchTerm] = useState("");
  const [Skip, setSkip] = useState(0);
  const [LoadMore, setLoadMore] = useState(true);
  const [havApply, setHavApply] = useState(false);
  const [Partner, setPartner] = useState("");

  const getLoadMore = () => {
    let body = {
      searchTerm: SearchTerm,
      manager: Partner,
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
  };

  const getSecondaryList = () => {
    setSkip(0);
    let body = {
      searchTerm: SearchTerm,
      manager: Partner,
      skip: 0,
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
  };

  useEffect(() => {
    getSecondaryList();
    // eslint-disable-next-line
  }, []);

  const SearchHandler = () => {
    setPartner(false);
    getSecondaryList();
  };

  return (
    <div>
      <SecondDiv>
        <SecondHeader All={true} />

        <div className="search input-group my-2 p-3 bg-white">
          <input
            type="text"
            value={SearchTerm}
            onChange={e => setSearchTerm(e.currentTarget.value)}
            onKeyDown={e => {
              if (e.keyCode === 13) SearchHandler();
            }}
            placeholder="고유번호 숫자를 입력하세요"
          />
          <button onClick={() => SearchHandler()} className="btn btn-success">
            검색
          </button>
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
