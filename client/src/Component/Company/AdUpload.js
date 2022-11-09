import React, { useState, useEffect } from "react";
import axios from "axios";

function AdUpload() {
  const [Company, setCompany] = useState([]);

  const getCompany = new Promise((resolve, reject) => {
    let body = {
      searchTerm: "",
    };
    axios
      .post("/api/secondary/adcompany", body)
      .then(function (response) {
        if (response.data.success) {
          let array = response.data.companyList;
          resolve(array);
        }
      })
      .catch(function (error) {
        alert("요청실패");
        console.log(error);
      });
  });

  useEffect(() => {
    async function fetchData() {
      let comp = await getCompany;
      setCompany(comp);
    }
    fetchData();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div className="bg-white p-3 shadow">
        <div className="input-group my-3">
          <span className="input-group-text">고유번호</span>
          <input className="form-control" type="text" />
        </div>
        <div className="fs-5">고유번호를 입력해 주세요</div>
      </div>
      {Company.map((company, idx) => {
        return (
          <div key={idx}>
            <div>
              {company.com_name} {company.com_area}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default AdUpload;
