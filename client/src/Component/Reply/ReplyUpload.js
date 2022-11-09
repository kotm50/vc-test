import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { ReplyUploadDiv } from "../../Style/ReplyCSS.js";

function ReplyUpload(props) {
  const [Reply, setReply] = useState("");
  const user = useSelector(state => state.user);

  const SubmitHandler = e => {
    e.preventDefault();
    if (!Reply) {
      return alert("댓글 내용을 입력하세요");
    }
    if (!user.uid) {
      return alert("로그인한 사용자만 댓글 입력이 가능합니다");
    }
    let body = {
      reply: Reply,
      uid: user.uid,
      postId: props.postId,
    };
    axios.post("/api/reply/submit", body).then(response => {
      if (response.data.success) {
        alert("댓글이 등록되었습니다");
        window.location.reload();
      } else {
        alert("댓글이 등록되지 않았습니다");
      }
    });
  };
  return (
    <ReplyUploadDiv>
      <form>
        <input
          type="text"
          value={Reply}
          onChange={e => {
            setReply(e.currentTarget.value);
          }}
        />
        <button
          onClick={e => {
            SubmitHandler(e);
          }}
        >
          등록
        </button>
      </form>
    </ReplyUploadDiv>
  );
}

export default ReplyUpload;
