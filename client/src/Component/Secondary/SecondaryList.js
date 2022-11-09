import React /* useState */ from "react";
import { SecondListDiv } from "../../Style/ListCSS.js";
//import { Link } from "react-router-dom";
import SecondaryDetail from "./SecondaryDetail";

function SecondaryList(props) {
  return (
    <SecondListDiv>
      {props.SecondaryList.map((Secondary, idx) => {
        return (
          <SecondaryDetail
            Secondary={Secondary}
            key={idx}
            havApply={props.havApply}
            Partner={Secondary.manager_id}
          />
        );
      })}
    </SecondListDiv>
  );
}

export default SecondaryList;
