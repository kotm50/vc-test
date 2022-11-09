import React, { useState, useEffect } from "react";
import LoginDiv from "../../Style/UserCSS";
import firebase from "../../firebase.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";

function Register() {
  const [Name, setName] = useState("");
  const [Cell, setCell] = useState("");
  const [Email, setEmail] = useState("");
  const [PW, setPW] = useState("");
  const [PWChk, setPWChk] = useState("");
  const [Flag, setFlag] = useState(false);
  const [EmailChk, setEmailChk] = useState(false);
  const [EmailInfo, setEmailInfo] = useState("");

  let navigate = useNavigate();

  const user = useSelector(state => state.user);
  useEffect(() => {
    if (user.accessToken) {
      navigate(-1);
    }
  });

  const RegisterFunc = async e => {
    setFlag(true);
    e.preventDefault();
    if (!(Name && Email && PW && PWChk)) {
      return alert("입력되지 않은 항목이 있습니다!");
    }
    if (PW !== PWChk) {
      return alert("입력하신 비밀번호가 일치하지 않습니다!");
    }
    if (PW.length < 8 || PWChk.length < 8) {
      return alert("비밀번호는 최소 8자 이상 입력해 주세요");
    }
    if (!EmailChk) {
      return alert("이메일 중복체크를 진행해 주세요");
    }
    if (Cell.includes("-")) {
      setCell(Cell.replaceAll("-", ""));
    }
    let createdUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(Email, PW);

    await createdUser.user.updateProfile({
      displayName: Name,
      photoURL: 1,
    });
    let body = {
      email: createdUser.user.multiFactor.user.email,
      displayName: createdUser.user.multiFactor.user.displayName,
      uid: createdUser.user.multiFactor.user.uid,
      phone: Cell,
      photoURL: 1,
    };
    axios.post("/api/user/register", body).then(response => {
      if (response.data.success) {
        //회원가입 성공시
        alert("생성 완료! 로그인을 진행해 주세요");
        navigate("/login");
      } else {
        //실패시
        alert("생성 실패! 입력 내용을 다시 확인해 주세요");
      }
      setFlag(false);
    });
  };

  const EmailCheckFunc = e => {
    e.preventDefault();
    if (!Email) {
      return alert("이메일을 입력해 주세요");
    }
    let body = {
      email: Email,
    };
    axios.post("/api/user/emailcheck", body).then(response => {
      if (response.data.success) {
        if (response.data.check) {
          setEmailChk(true);
          setEmailInfo("사용 가능한 이메일 입니다");
        } else {
          setEmailInfo("이미 사용중인 이메일 입니다");
        }
      }
    });
  };

  const EmailUpdateFunc = e => {
    e.preventDefault();
    setEmailChk(false);
    alert("이메일을 다시 입력해 주세요");
    setEmail("");
    setEmailInfo("");
  };

  return (
    <LoginDiv>
      <form>
        <label htmlFor="name">이름</label>
        <input
          type="text"
          id="name"
          value={Name}
          onChange={e => setName(e.currentTarget.value)}
        />

        <label htmlFor="cell">연락처</label>
        <input
          type="text"
          id="cell"
          value={Cell}
          onChange={e => setCell(e.currentTarget.value)}
        />
        <label htmlFor="email">이메일</label>
        <input
          type="text"
          id="email"
          value={Email}
          onChange={e => setEmail(e.currentTarget.value)}
          disabled={EmailChk}
        />
        {EmailChk ? (
          <button onClick={e => EmailUpdateFunc(e)}>이메일 다시입력</button>
        ) : (
          <button onClick={e => EmailCheckFunc(e)}>이메일 중복검사</button>
        )}
        <p className={EmailChk ? "currect" : "errMsg"}>{EmailInfo}</p>
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          value={PW}
          minLength={8}
          onChange={e => setPW(e.currentTarget.value)}
        />
        <label htmlFor="passwordChk">비밀번호확인</label>
        <input
          type="password"
          id="passwordChk"
          value={PWChk}
          minLength={8}
          onChange={e => setPWChk(e.currentTarget.value)}
        />
        <button disabled={Flag} onClick={e => RegisterFunc(e)}>
          {Flag ? (
            <Spinner animation="border" role="status" size="sm" variant="light">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <span>회원가입</span>
          )}
        </button>
      </form>
    </LoginDiv>
  );
}

export default Register;
