import React, { useState, useEffect } from "react";
import List from "./ApplyList.js";
import axios from "axios";

import { DropdownButton, Dropdown } from "react-bootstrap";
import { GNBDiv, FooterDiv } from "../../Style/MainPageCSS.js";

function MainPage() {
  const [ApplyList, setApplyList] = useState([]);
  const [Sort, setSort] = useState("최신순");
  const [SearchTerm, setSearchTerm] = useState("");
  const [Skip, setSkip] = useState(0);
  const [LoadMore, setLoadMore] = useState(true);

  const getLoadMore = () => {
    let body = {
      sort: Sort,
      searchTerm: SearchTerm,
      skip: Skip,
    };
    axios
      .post("/api/apply/list", body)
      .then(function (response) {
        if (response.data.success) {
          setApplyList([...ApplyList, ...response.data.applyList]);
          setSkip(Skip + response.data.applyList.length);
          if (response.data.applyList.length < 5) {
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

  const getApplyList = () => {
    setSkip(0);
    let body = {
      sort: Sort,
      searchTerm: SearchTerm,
      skip: 0,
    };
    axios
      .post("/api/apply/list", body)
      .then(function (response) {
        if (response.data.success) {
          setApplyList([...response.data.applyList]);
          setSkip(response.data.applyList.length);
          if (response.data.applyList.length < 5) {
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
    getApplyList();
    // eslint-disable-next-line
  }, [Sort]);

  const SearchHandler = () => {
    getApplyList();
  };

  return (
    <div>
      <GNBDiv>
        <div className="search input-group pe-3">
          <input
            type="text"
            value={SearchTerm}
            onChange={e => setSearchTerm(e.currentTarget.value)}
            onKeyDown={e => {
              if (e.keyCode === 13) SearchHandler();
            }}
          />
          <button onClick={() => SearchHandler()} className="btn btn-success">
            검색
          </button>
        </div>

        <DropdownButton variant="primary" title={Sort}>
          <Dropdown.Item onClick={() => setSort("최신순")}>
            최신순
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setSort("오래된 순")}>
            오래된 순
          </Dropdown.Item>
        </DropdownButton>
      </GNBDiv>
      <List ApplyList={ApplyList} />
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

export default MainPage;
