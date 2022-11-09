import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ImageUpload from "./ImageUpload.js";
import { useNavigate } from "react-router-dom";
import {
  UploadDiv,
  UploadButtonDiv,
  UploadForm,
} from "../../Style/UploadCSS.js";

function Edit() {
  //글내용 불러오는 함수들
  let params = useParams();
  const [PostInfo, setPostInfo] = useState({});
  let navigate = useNavigate();
  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");
  const [Image, setImage] = useState("");
  useEffect(() => {
    let body = {
      postNum: params.postNum,
    };
    axios
      .post("/api/post/detail", body)
      .then(response => {
        if (response.data.success) {
          setPostInfo(response.data.post);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [params.postNum]);

  useEffect(() => {
    if (PostInfo.title !== undefined) {
      setTitle(PostInfo.title);
      setContent(PostInfo.content);
    } else {
      setTitle("불러오는 중입니다...");
      setContent("");
    }
  }, [PostInfo]);

  const onSubmit = e => {
    e.preventDefault();
    if (Title === "" || Content === "") {
      return alert("제목과 내용을 입력해주세요!");
    }

    let body = {
      title: Title,
      content: Content,
      image: PostInfo.image,
      postNum: params.postNum,
    };
    if (Image !== "") {
      body = {
        title: Title,
        content: Content,
        image: Image,
        postNum: params.postNum,
      };
    }

    axios
      .post("/api/post/edit", body)
      .then(response => {
        if (response.data.success) {
          alert("수정완료!");
          navigate(`/post/${params.postNum}`);
        } else {
          alert("수정실패!");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <UploadDiv>
      <UploadForm>
        <label htmlFor="title">제목</label>
        <input
          id="title"
          type="text"
          value={Title}
          onChange={e => {
            setTitle(e.currentTarget.value);
          }}
        />
        <ImageUpload setImage={setImage} />
        <label htmlFor="content">내용</label>
        <textarea
          id="content"
          value={Content}
          onChange={e => {
            setContent(e.currentTarget.value);
          }}
        />
        <UploadButtonDiv>
          <button
            className="cancel"
            onClick={e => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            취소!
          </button>
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

export default Edit;
