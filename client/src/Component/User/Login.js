import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginDiv from "../../Style/UserCSS";
import firebase from "../../firebase.js";

function Login() {
  const [Email, setEmail] = useState("");
  const [PW, setPW] = useState("");
  const [ErrMsg, setErrMsg] = useState("");
  let navigate = useNavigate();
  const user = useSelector(state => state.user);

  useEffect(() => {
    if (user.accessToken) {
      navigate(-1);
    }
  });

  const LoginbyKeyboard = e => {
    SignInFunc(e);
  };

  const SignInFunc = async e => {
    e.preventDefault();
    if (!(Email && PW)) {
      return alert("입력되지 않은 항목이 있습니다!");
    }
    try {
      await firebase.auth().signInWithEmailAndPassword(Email, PW);
      navigate("/secondary");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setErrMsg("존재하지 않는 이메일 주소입니다");
      } else if (error.code === "auth/wrong-password") {
        setErrMsg("비밀번호를 잘못 입력하셨습니다");
      } else {
        setErrMsg("로그인에 실패했습니다");
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setErrMsg("");
    }, 3000);
  }, [ErrMsg]);
  return (
    <LoginDiv>
      <form>
        <label htmlFor="Email">이메일</label>
        <input
          type="text"
          id="Email"
          value={Email}
          required
          onChange={e => setEmail(e.currentTarget.value)}
        />
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          value={PW}
          required
          onChange={e => setPW(e.currentTarget.value)}
        />
        {ErrMsg !== "" && <p className="errMsg">{ErrMsg}</p>}
        <button
          onClick={e => SignInFunc(e)}
          onKeyPress={e => LoginbyKeyboard(e)}
        >
          로그인
        </button>
        <button
          onClick={e => {
            e.preventDefault();
            navigate("/join");
          }}
        >
          계정 생성
        </button>
      </form>
    </LoginDiv>
  );
}

export default Login;
