import React, { useEffect, useState } from "react";
import {
  UploadDiv,
  UploadButtonDiv,
  UploadForm,
} from "../../Style/UploadCSS.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ImageUpload from "./ImageUpload.js";

function Upload() {
  const user = useSelector(state => state.user);
  let navigate = useNavigate();
  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");
  const [Image, setImage] = useState("");
  useEffect(() => {
    if (!user.accessToken) {
      alert("로그인 한 회원만 글을 작성할 수 있습니다");
      navigate("/login");
    }
  });

  const onSubmit = e => {
    e.preventDefault();
    if (Title === "" || Content === "") {
      return alert("제목과 내용을 입력해주세요!");
    }

    let body = {
      title: Title,
      content: Content,
      image: Image,
      uid: user.uid,
    };

    axios
      .post("/api/post/submit", body)
      .then(response => {
        if (response.data.success) {
          alert("작성완료!");
          navigate("/");
        } else {
          alert("작성실패!");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <UploadDiv className="container">
      <UploadForm>
        <label htmlFor="title">제목</label>
        <input
          id="title"
          type="text"
          className="form-control"
          value={Title}
          onChange={e => {
            setTitle(e.currentTarget.value);
          }}
        />
        <ImageUpload setImage={setImage} />
        <label htmlFor="content">내용</label>
        <textarea
          id="content"
          className="form-control"
          value={Content}
          onChange={e => {
            setContent(e.currentTarget.value);
          }}
        />
        <UploadButtonDiv>
          <button
            onClick={e => {
              onSubmit(e);
            }}
          >
            제출!
          </button>
        </UploadButtonDiv>
      </UploadForm>
    </UploadDiv>
  );
}

export default Upload;
