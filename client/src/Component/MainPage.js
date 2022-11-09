import React, { useState, useEffect } from "react";
import List from "./Post/List.js";
import axios from "axios";

import { DropdownButton, Dropdown } from "react-bootstrap";
import { GNBDiv, FooterDiv } from "../Style/MainPageCSS.js";

function MainPage() {
  const [PostList, setPostList] = useState([]);
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
      .post("/api/post/list", body)
      .then(function (response) {
        if (response.data.success) {
          setPostList([...PostList, ...response.data.postList]);
          setSkip(Skip + response.data.postList.length);
          if (response.data.postList.length < 5) {
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

  const getPostList = () => {
    setSkip(0);
    let body = {
      sort: Sort,
      searchTerm: SearchTerm,
      skip: 0,
    };
    axios
      .post("/api/post/list", body)
      .then(function (response) {
        if (response.data.success) {
          setPostList([...response.data.postList]);
          setSkip(response.data.postList.length);
          if (response.data.postList.length < 5) {
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
    getPostList();
    // eslint-disable-next-line
  }, [Sort]);

  const SearchHandler = () => {
    getPostList();
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
          <Dropdown.Item onClick={() => setSort("인기순")}>
            인기순
          </Dropdown.Item>
        </DropdownButton>
      </GNBDiv>
      <List PostList={PostList} />
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
