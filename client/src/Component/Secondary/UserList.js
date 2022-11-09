import React, { useState, useEffect } from "react";
import axios from "axios";
import { SecondDiv, CompanyDiv } from "../../Style/CompanyCSS.js";

function UserList(props) {
  const [UserList, setUserList] = useState([]);
  const [SearchTerm, setSearchTerm] = useState("");
  const [Search, setSearch] = useState(false);

  const getUserList = () => {
    let body = {
      searchTerm: SearchTerm,
    };
    axios
      .post("/api/user/search", body)
      .then(function (response) {
        if (response.data.success) {
          setUserList([...response.data.userList]);
        }
      })
      .catch(function (error) {
        alert("요청실패");
        console.log(error);
      })
      .then(function () {});
  };

  useEffect(() => {
    getUserList();
    // eslint-disable-next-line
  }, []);

  const SearchHandler = () => {
    getUserList();
  };

  return (
    <div>
      <SecondDiv>
        <div className="search">
          <input
            type="text"
            value={SearchTerm}
            onChange={e => setSearchTerm(e.currentTarget.value)}
            onKeyUp={e => {
              if (e.keyCode === 13) {
                SearchHandler(e);
              } else {
                e.preventDefault();
                SearchHandler(e);
              }
            }}
            onFocus={e => setSearch(true)}
            placeholder="관리자 이름을 입력하세요"
          />
        </div>
        {Search ? (
          <CompanyDiv>
            {UserList.map((user, idx) => {
              return (
                <div
                  className="list"
                  key={idx}
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className="name">{user.displayName}</div>
                  <div>
                    <button
                      className="btn btn-primary"
                      onClick={e => {
                        e.preventDefault();
                        props.setPartner(user.displayName);
                      }}
                    >
                      선택
                    </button>
                  </div>
                </div>
              );
            })}
          </CompanyDiv>
        ) : null}
      </SecondDiv>
    </div>
  );
}

export default UserList;
