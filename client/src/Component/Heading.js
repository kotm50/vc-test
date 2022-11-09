import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import firebase from "../firebase";
import Clock from "./Clock";

function Heading() {
  const user = useSelector(state => state.user);
  const navigate = useNavigate();
  const LogoutHandler = () => {
    firebase.auth().signOut();
    navigate("/");
  };
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="/" style={{ color: "#ff9", fontWeight: "bold" }}>
          KoTi 전산시스템 BETA
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link
              to="/upload"
              style={{
                color: "white",
                textDecoration: "none",
                marginRight: "10px",
              }}
            >
              글쓰기
            </Link>
            <Link
              to="/secondaryall"
              style={{
                color: "white",
                textDecoration: "none",
                marginRight: "10px",
              }}
            >
              2차관리
            </Link>
            <Link
              to="/capture"
              style={{
                color: "white",
                textDecoration: "none",
                marginRight: "10px",
              }}
            >
              면접현황공유
            </Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          {user.accessToken ? (
            <div>
              <span style={{ color: "white", marginRight: "5px" }}>
                안녕하세요! <strong>{user.displayName}</strong>님
              </span>
              <Navbar.Text
                style={{ color: "white", cursor: "pointer" }}
                onClick={() => LogoutHandler()}
              >
                로그아웃
              </Navbar.Text>
            </div>
          ) : (
            <div
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              <Link
                to="/login"
                style={{
                  color: "white",
                  textDecoration: "none",
                }}
              >
                로그인
              </Link>{" "}
              |{" "}
              <Link
                to="/join"
                style={{
                  color: "white",
                  textDecoration: "none",
                }}
              >
                회원가입
              </Link>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
      <Clock />
    </Navbar>
  );
}

export default Heading;
