import React, { useState, useEffect } from "react";
import { ReplyListDiv } from "../../Style/ReplyCSS.js";
import axios from "axios";

import ReplyContent from "./ReplyContent.js";

function ReplyList(props) {
  const [replyList, setReplyList] = useState([]);
  const [replyOn, setReplyOn] = useState(false);
  useEffect(() => {
    let body = {
      postId: props.postId,
    };
    axios.post("/api/reply/getReply", body).then(response => {
      if (response.data.success) {
        setReplyList([...response.data.replyList]);
      }
    });

    if (replyList.length > 0) {
      setReplyOn(true);
    }
  }, [props.postId, replyList.length]);
  return (
    <ReplyListDiv>
      {!replyOn && (
        <div className="noReply">댓글이 아직 등록되지 않았습니다</div>
      )}
      {replyList.map((reply, idx) => {
        return <ReplyContent reply={reply} key={idx} />;
      })}
    </ReplyListDiv>
  );
}

export default ReplyList;
