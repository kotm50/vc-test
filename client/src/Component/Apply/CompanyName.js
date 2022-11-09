import React, { useState, useEffect } from "react";
import axios from "axios";

function CompanyName(props) {
  const [cName, setCName] = useState("");
  useEffect(() => {
    if (props.comCode) {
      companySearch(props.comCode);
    }
  }, [props.comCode]);

  const companySearch = c => {
    let body = {
      searchTerm: c,
    };
    axios
      .post("/api/secondary/companysearch", body)
      .then(function (response) {
        if (response.data.success) {
          setCName(
            response.data.companyName.com_name +
              " - " +
              response.data.companyName.com_area
          );
        }
      })
      .catch(function (error) {
        alert("요청실패");
        console.log(error);
      })
      .then(function () {});
  };
  return <div>{cName}</div>;
}

export default CompanyName;
