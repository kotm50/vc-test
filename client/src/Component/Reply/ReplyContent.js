import React, { useState, useEffect, useRef } from "react";
import { ReplyContentDiv, ReplyUploadDiv } from "../../Style/ReplyCSS.js";
import { useSelector } from "react-redux";
import axios from "axios";

function ReplyContent(props) {
  const user = useSelector(state => state.user);
  const [ModalFlag, setModalFlag] = useState(false);
  const [EditFlag, setEditFlag] = useState(false);
  const [Reply, setReply] = useState("");

  const ref = useRef();
  useOnClickOutside(ref, () => setModalFlag(false));
  const SubmitHandler = e => {
    e.preventDefault();
    let body = {
      uid: user.uid,
      reply: Reply,
      postId: props.reply.postId,
      replyId: props.reply._id,
    };
    axios.post("/api/reply/edit", body).then(response => {
      if (response.data.success) {
        alert("댓글이 수정되었습니다");
      } else {
        alert("댓글 수정에 실패했습니다");
      }
      return window.location.reload();
    });
  };
  const DeleteHandler = e => {
    e.preventDefault();
    if (window.confirm("삭제하면 되돌릴 수 없습니다\n정말 삭제할까요?")) {
      let body = {
        replyId: props.reply._id,
        postId: props.reply.postId,
      };
      axios
        .post("/api/reply/delete", body)
        .then(response => {
          if (response.data.success) {
            alert("댓글이 삭제되었습니다");
            window.location.reload();
          }
        })
        .catch(err => {
          alert("삭제 중 오류가 발생했습니다 다시 시도해주세요");
        });
    }
  };
  return (
    <ReplyContentDiv>
      <div className="auth">{props.reply.author.displayName}</div>
      {props.reply.author.uid === user.uid && (
        <div className="modalControl">
          <span onClick={() => setModalFlag(true)}>...</span>
          {ModalFlag && (
            <div className="modalDiv" ref={ref}>
              <div
                className="update"
                onClick={() => {
                  setEditFlag(true);
                  setModalFlag(false);
                }}
              >
                수정
              </div>
              <div className="delete" onClick={e => DeleteHandler(e)}>
                삭제
              </div>
            </div>
          )}
        </div>
      )}
      {EditFlag ? (
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
          <div className="cancel">
            <button
              onClick={e => {
                e.preventDefault();
                setEditFlag(false);
              }}
            >
              취소
            </button>
          </div>
        </ReplyUploadDiv>
      ) : (
        <div className="content">{props.reply.reply}</div>
      )}
    </ReplyContentDiv>
  );
}

// Hook
function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = event => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

export default ReplyContent;
