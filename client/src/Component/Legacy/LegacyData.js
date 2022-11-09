import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function LegacyData() {
  const user = useSelector(state => state.user);
  let navigate = useNavigate();

  const [Dummy, setDummy] = useState([]);

  useEffect(() => {
    if (!user.accessToken) {
      alert("로그인 한 회원만 글을 작성할 수 있습니다");
      navigate("/login");
    } else if (user.photoURL > 0) {
      alert("이 페이지에 접속할 권한이 없습니다");
      navigate("/secondary");
    }
    // eslint-disable-next-line
  }, []);

  const getDummy = () => {
    axios
      .post("/api/apply/dummy")
      .then(response => {
        if (response.data.success) {
          setDummy(response.data.dummyList);
        }
      })
      .catch(err => {
        alert("에러");
      });
    console.log(Dummy);
  };

  const DeleteDummy = () => {
    axios
      .post("/api/apply/deletedummy")
      .then(response => {
        if (response.data.success) {
          alert("완료");
        }
      })
      .catch(err => {
        alert("에러");
      });
  };

  useEffect(() => {
    getDummy();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <button onClick={e => DeleteDummy()}>지우기</button>
      {Dummy.map((dummy, idx) => {
        return (
          <div key={idx}>
            <div>{dummy.com_code}</div>
          </div>
        );
      })}
    </div>
  );
}

export default LegacyData;
