import React from "react";
import ReplyUpload from "./ReplyUpload";
import ReplyList from "./ReplyList";
import { useSelector } from "react-redux";

function ReplyArea(props) {
  const user = useSelector(state => state.user);

  return (
    <div>
      {user.accessToken && <ReplyUpload postId={props.PostId} />}
      <ReplyList postId={props.PostId} />
    </div>
  );
}

export default ReplyArea;
