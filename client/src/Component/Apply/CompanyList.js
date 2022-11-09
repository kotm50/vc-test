import React, { useState, useEffect } from "react";
import axios from "axios";
import { SecondDiv, CompanyDiv } from "../../Style/CompanyCSS.js";

function CompanyList(props) {
  const [CompanyList, setCompanyList] = useState([]);
  const [SearchTerm, setSearchTerm] = useState("");

  const getCompanyList = () => {
    let body = {
      searchTerm: SearchTerm,
    };
    axios
      .post("/api/secondary/companylist", body)
      .then(function (response) {
        if (response.data.success) {
          setCompanyList([...response.data.companyList]);
        }
      })
      .catch(function (error) {
        alert("요청실패");
        console.log(error);
      })
      .then(function () {});
  };

  useEffect(() => {
    getCompanyList();
    // eslint-disable-next-line
  }, []);

  const SearchHandler = () => {
    getCompanyList();
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
            placeholder="고객사 고유번호를 입력하세요"
          />
        </div>
        {SearchTerm ? (
          <CompanyDiv>
            {CompanyList.map((Company, idx) => {
              return (
                <div
                  className="list"
                  key={idx}
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className="name">
                    {Company.com_name} {Company.com_area}
                  </div>
                  <div>
                    <button
                      className="btn btn-primary"
                      onClick={e => {
                        e.preventDefault();
                        props.setComCode(Company.com_code);
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

export default CompanyList;
