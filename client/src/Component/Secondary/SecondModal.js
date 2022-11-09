import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import axios from "axios";
import dayjs from "dayjs";
import html2canvas from "html2canvas";

function SecondModal(props) {
  const [show, setShow] = useState(false);
  const [Arr, setArr] = useState([]);

  const getApplyList = () => {
    let body = {
      searchTerm: props.comCode,
    };
    axios
      .post("/api/apply/comcode", body)
      .then(function (response) {
        if (response.data.success) {
          setArr([...response.data.applyList]);
        }
      })
      .catch(function (error) {
        alert("요청실패");
      })
      .then(function () {});
  };

  const handleClose = () => setShow(false);
  const handleShow = () => {
    getApplyList();
    setShow(true);
  };

  const onSaveToImg = () => {
    //클릭 이벤트
    const capture = document.querySelector("#capture"); //이미지 저장 영역
    html2canvas(capture).then(canvas => {
      saveAs(canvas.toDataURL("image/jpg"), "이미지.jpg");
    });
  };

  const saveAs = (uri, filename) => {
    let link = document.createElement("a");
    if (typeof link.download === "string") {
      link.href = uri;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(uri);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        공유하기
      </Button>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Body id="capture">
          <h5 className="fw-bold">면접예정자</h5>
          <Table striped bordered hover>
            <thead className="bg-warning border-dark">
              <tr>
                <th>번호</th>
                <th>이름</th>
                <th>나이</th>
                <th>면접일정</th>
              </tr>
            </thead>
            <tbody>
              {Arr.sort(
                (a, b) =>
                  new Date(a.interview_time) - new Date(b.interview_time)
              ).map((apply, idx) => {
                return (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{apply.apply_name}</td>
                    <td>
                      {apply.apply_snum.length === 8
                        ? Number(props.Year) -
                          Number(apply.apply_snum.substr(0, 4))
                        : apply.apply_snum}{" "}
                      세
                    </td>
                    <td>
                      {dayjs(apply.interview_time).format(
                        "YYYY년 MM월 DD일 HH시 mm분"
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={e => {
              onSaveToImg();
            }}
          >
            이미지로저장
          </Button>
          <Button variant="primary" onClick={handleClose}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SecondModal;
