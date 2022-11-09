import React /* useState */ from "react";
import { ListDiv } from "../../Style/ListCSS.js";
//import { Link } from "react-router-dom";
import ApplyDetail from "./ApplyDetail";

function ApplyList(props) {
  return (
    <ListDiv>
      {props.ApplyList.map((apply, idx) => {
        return (
          <ApplyDetail apply={apply} key={idx} image={props.ApplyList.image} />
        );
      })}
    </ListDiv>
  );
}

export default ApplyList;
