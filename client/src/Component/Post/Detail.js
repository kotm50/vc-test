import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PostDiv, Post, BtnDiv } from "../../Style/PostDetailCSS.js";
import { useSelector } from "react-redux";

import moment from "moment";
import "moment/locale/ko";

function Detail(props) {
  const [Break, setBreak] = useState("");
  const user = useSelector(state => state.user);
  let navigate = useNavigate();

  useEffect(() => {
    let c = props.PostInfo.content;
    breakHandler(c);
  }, [props.PostInfo.content]);

  const breakHandler = c => {
    let a = c.split("\n");
    let b = a.join("<br />");
    setBreak(b);
  };

  const DeleteHandler = () => {
    if (window.confirm("삭제하면 되돌릴 수 없습니다\n정말 삭제할까요?")) {
      let body = {
        postNum: props.PostInfo.postNum,
      };
      axios
        .post("/api/post/delete", body)
        .then(response => {
          if (response.data.success) {
            alert("글이 삭제되었습니다");
            navigate("/");
          }
        })
        .catch(err => {
          alert("삭제 중 오류가 발생했습니다 다시 시도해주세요");
        });
    }
  };

  return (
    <PostDiv>
      <Post>
        <h2>{props.PostInfo.title}</h2>
        <h6
          style={{
            textAlign: "right",
            margin: "20px 0",
            color: "#666",
            fontSize: "0.8em",
          }}
        >
          {moment(props.PostInfo.updatedAt).format("YYYY년 MMM Do dddd LT")}에{" "}
          <strong>{props.PostInfo.author.displayName}</strong> 님이{" "}
          {props.PostInfo.updatedAt === props.PostInfo.createdAt
            ? "작성"
            : "수정"}
          했습니다
        </h6>
        {props.PostInfo.image ? (
          <img
            src={`http://millinienimg.godohosting.com/${props.PostInfo.image}`}
            alt=""
          />
        ) : null}

        <p dangerouslySetInnerHTML={{ __html: Break }}></p>
      </Post>
      <BtnDiv>
        <Link to={`/post/17`}>
          <button className="list">17</button>
        </Link>
        <Link to={`/post/16`}>
          <button className="list">16</button>
        </Link>
        <Link to={`/post/15`}>
          <button className="list">15</button>
        </Link>
        <Link to={`/post/13`}>
          <button className="list">13</button>
        </Link>
        <Link to={"/"}>
          <button className="list">목록으로</button>
        </Link>
        {user.uid === props.PostInfo.author.uid && (
          <>
            <Link to={`/edit/${props.PostInfo.postNum}`}>
              <button className="edit">수정</button>
            </Link>
            <button className="delete" onClick={() => DeleteHandler()}>
              삭제
            </button>
          </>
        )}
      </BtnDiv>
    </PostDiv>
  );
}

export default Detail;
