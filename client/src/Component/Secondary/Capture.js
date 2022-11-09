import React, { useState, useEffect, useRef } from "react";
import { Table } from "react-bootstrap";
import dayjs from "dayjs";
import html2canvas from "html2canvas";

function Capture() {
  const [OriginData, setOriginData] = useState("");
  const [Array, setArray] = useState(null);
  const [Array2, setArray2] = useState(null);
  const [Array3, setArray3] = useState(null);
  const [ArrOn, setArrOn] = useState(false);
  const [ArrOn2, setArrOn2] = useState(false);
  const [ArrOn3, setArrOn3] = useState(false);
  const [Today, setToday] = useState("");
  let now = dayjs();
  const inputSheet = useRef();

  useEffect(() => {
    setToday(now.format("YYYY년 MM월 DD일"));
    // eslint-disable-next-line
  }, []);
  //const [JsonData, setJsonData] = useState([])
  const convertJson = e => {
    setArrOn(false);
    setArrOn2(false);
    setArrOn3(false);
    setArray(null);
    setArray2(null);
    setArray3(null);
    let jsonA = OriginData.split("\n");
    let jsonB = [];
    let jsonC = [];
    let jsonD = [];
    let jsonE = [];
    let body = {};
    jsonA.forEach((row, index) => {
      jsonB = row.split("\t");
      if (row.length === 0) return;
      body = {
        id: index,
        num: jsonB[0],
        interview: jsonB[1],
        comp: jsonB[2],
        name: jsonB[3],
        age: jsonB[4],
        gender: jsonB[5],
        contact: jsonB[6],
        result: jsonB[8],
        stat: jsonB[9],
      };
      if (index < 20) {
        jsonC.push(body);
      } else if (index < 40) {
        jsonD.push(body);
      } else {
        jsonE.push(body);
      }
    });
    if (jsonC.length > 0 && jsonC.length < 20) {
      let i;
      for (i = jsonC.length; i < 20; i++) {
        body = {
          id: i,
        };
        jsonC.push(body);
      }
    }

    if (jsonD.length > 0 && jsonD.length < 20) {
      let i;
      for (i = jsonD.length; i < 20; i++) {
        body = {
          id: i + 20,
        };
        jsonD.push(body);
      }
    }

    if (jsonE.length > 0 && jsonE.length < 20) {
      let i;
      for (i = jsonE.length; i < 20; i++) {
        body = {
          id: i + 40,
        };
        jsonE.push(body);
      }
    }
    console.log(jsonC);
    console.log(jsonD);
    console.log(jsonE);
    if (jsonC.length > 0) {
      setArray(jsonC);
      setArrOn(true);
    }
    if (jsonD.length > 0) {
      setArray2(jsonD);
      setArrOn2(true);
    }
    if (jsonE.length > 0) {
      setArray3(jsonE);
      setArrOn3(true);
    }
  };

  useEffect(() => {
    convertJson();
    // eslint-disable-next-line
  }, [OriginData]);

  const onSaveToImgAll = () => {
    onSaveToImg(1);
    setTimeout(() => {
      if (ArrOn2) onSaveToImg(2);
    }, 500);
    setTimeout(() => {
      if (ArrOn3) onSaveToImg(3);
    }, 1000);
  };

  const onClipToImg = c => {
    const { ClipboardItem } = window;
    let capture;
    //클릭 이벤트
    if (c === 1) {
      capture = document.querySelector("#capture1"); //이미지 저장 영역
    } else if (c === 2) {
      capture = document.querySelector("#capture2"); //이미지 저장 영역
    } else if (c === 3) {
      capture = document.querySelector("#capture3"); //이미지 저장 영역
    }
    html2canvas(capture).then(canvas => {
      canvas.toBlob(blob =>
        navigator.clipboard.write([new ClipboardItem({ "image/png": blob })])
      );
    });
  };

  const onSaveToImg = c => {
    let capture;
    //클릭 이벤트
    if (c === 1) {
      capture = document.querySelector("#capture1"); //이미지 저장 영역
    } else if (c === 2) {
      capture = document.querySelector("#capture2"); //이미지 저장 영역
    } else if (c === 3) {
      capture = document.querySelector("#capture3"); //이미지 저장 영역
    }
    let captureTime = now.format("YYYYMMDDHHmm");
    html2canvas(capture).then(canvas => {
      if (c === 1) {
        saveAs(canvas.toDataURL("image/jpg"), "공유_1_" + captureTime + ".jpg");
      } else if (c === 2) {
        saveAs(canvas.toDataURL("image/jpg"), "공유_2_" + captureTime + ".jpg");
      } else if (c === 3) {
        saveAs(canvas.toDataURL("image/jpg"), "공유_3_" + captureTime + ".jpg");
      }
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
      <div className="position-fixed bg-white bottom-0 start-0 border-top w-100 p-3 text-center">
        {!ArrOn ? (
          <span onClick={e => inputSheet.current.focus()}>
            시트에서 내용을 복사하여 붙여넣기 해주세요
          </span>
        ) : (
          <>
            <button
              className="btn btn-primary me-2"
              onClick={e => onClipToImg(1)}
            >
              1번 이미지 캡쳐
            </button>
            {!ArrOn2 ? null : (
              <button
                className="btn btn-primary me-2"
                onClick={e => onClipToImg(2)}
              >
                2번 이미지 캡쳐
              </button>
            )}
            {!ArrOn3 ? null : (
              <button className="btn btn-primary" onClick={e => onClipToImg(3)}>
                3번 이미지 캡쳐
              </button>
            )}
          </>
        )}
      </div>
      <div className="p-2">
        <textarea
          ref={inputSheet}
          className="mb-2"
          value={OriginData}
          onChange={e => {
            setOriginData(e.currentTarget.value);
          }}
          style={{ width: "100%", height: "48px" }}
          placeholder="2번째 줄 부터 원하는 영역까지 복사(ctrl+c) 하신 다음 여기에 붙여넣기(ctrl+v) 해주세요"
        ></textarea>
        <div className="mb-3 text-center">
          {!ArrOn2 ? null : (
            <div className="mb-3">
              <button
                className="btn btn-success"
                onClick={e => onSaveToImgAll()}
              >
                전부 이미지로 저장
              </button>
            </div>
          )}
          {!ArrOn ? null : (
            <>
              <div
                id="capture1"
                className="bg-white p-3 border mt-2"
                style={{
                  width: "700px",
                  height: "700px",
                  overflow: "hidden",
                  margin: "0 auto",
                }}
              >
                <h5 className="fw-bold">면접자 리스트 - {Today}</h5>
                <Table size="sm" style={{ fontSize: "0.8em" }}>
                  <thead
                    className="bg-warning"
                    style={{
                      borderBottomWidth: "2px",
                      borderBottomColor: "rgba(0, 0, 0, 0.075)",
                    }}
                  >
                    <tr>
                      <td className="border-start border-end border-top border-dark">
                        순서
                      </td>
                      <td className="border-end border-top border-dark">
                        면접일시
                      </td>
                      <td className="border-end border-top border-dark">
                        이름
                      </td>
                      <td className="border-end border-top border-dark">
                        나이
                      </td>
                      <td className="border-end border-top border-dark">
                        성별
                      </td>
                      <td className="border-end border-top border-dark">
                        면접결과
                      </td>
                      <td className="border-end border-top border-dark">
                        진행상황
                      </td>
                    </tr>
                  </thead>
                  <tbody style={{ backgroundColor: "#ffe" }}>
                    {Array.map(array => {
                      return (
                        <tr
                          key={array.id}
                          style={
                            array.id % 2 === 0
                              ? { backgroundColor: "#fafafa" }
                              : { backgroundColor: "#fff" }
                          }
                        >
                          <td className="border-start border-end">
                            {array.id + 1}
                          </td>
                          <td className="border-end">{array.interview}</td>
                          <td className="border-end">{array.name}</td>
                          <td className="border-end">{array.age}</td>
                          <td className="border-end">{array.gender}</td>
                          <td
                            className="border-end"
                            style={
                              array.result === "" ||
                              array.result === null ||
                              array.result === undefined
                                ? {
                                    backgroundColor: "#fce5cd",
                                  }
                                : array.result === "입과"
                                ? { backgroundColor: "#c9daf8" }
                                : null
                            }
                          >
                            {array.result === "합격" ? (
                              <span style={{ color: "red" }}>합격</span>
                            ) : array.result === "진행중" ? (
                              <span style={{ color: "blue" }}>진행중</span>
                            ) : array.result === "입과" ? (
                              <span style={{ color: "blue" }}>입과</span>
                            ) : (
                              <span>{array.result}</span>
                            )}
                          </td>
                          <td className="border-end">{array.stat}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
                <div>
                  <p className="text-center">코리아티엠 채용연구소</p>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="mb-3 text-center">
          {!ArrOn2 ? null : (
            <>
              <div
                id="capture2"
                className="bg-white p-3 border mt-2"
                style={{
                  width: "700px",
                  height: "700px",
                  overflow: "hidden",
                  margin: "0 auto",
                }}
              >
                <h5 className="fw-bold">면접자 리스트 - {Today}</h5>
                <Table size="sm" style={{ fontSize: "0.8em" }}>
                  <thead
                    className="bg-warning"
                    style={{ borderBottomWidth: "2px" }}
                  >
                    <tr>
                      <td className="border-start border-end border-top border-dark">
                        순서
                      </td>
                      <td className="border-end border-top border-dark">
                        면접일시
                      </td>
                      <td className="border-end border-top border-dark">
                        이름
                      </td>
                      <td className="border-end border-top border-dark">
                        나이
                      </td>
                      <td className="border-end border-top border-dark">
                        성별
                      </td>
                      <td className="border-end border-top border-dark">
                        면접결과
                      </td>
                      <td className="border-end border-top border-dark">
                        진행상황
                      </td>
                    </tr>
                  </thead>
                  <tbody style={{ backgroundColor: "#ffe" }}>
                    {Array2.map(array => {
                      return (
                        <tr
                          key={array.id}
                          style={
                            array.id % 2 === 0
                              ? { backgroundColor: "#fafafa" }
                              : { backgroundColor: "#fff" }
                          }
                        >
                          <td className="border-start border-end">
                            {array.id + 1}
                          </td>
                          <td className="border-end">{array.interview}</td>
                          <td className="border-end">{array.name}</td>
                          <td className="border-end">{array.age}</td>
                          <td className="border-end">{array.gender}</td>
                          <td
                            className="border-end"
                            style={
                              array.result === "" ||
                              array.result === null ||
                              array.result === undefined
                                ? {
                                    backgroundColor: "#fce5cd",
                                  }
                                : array.result === "입과"
                                ? { backgroundColor: "#c9daf8" }
                                : null
                            }
                          >
                            {array.result === "합격" ? (
                              <span style={{ color: "red" }}>합격</span>
                            ) : array.result === "진행중" ? (
                              <span style={{ color: "blue" }}>진행중</span>
                            ) : array.result === "입과" ? (
                              <span style={{ color: "blue" }}>입과</span>
                            ) : (
                              <span>{array.result}</span>
                            )}
                          </td>
                          <td className="border-end">{array.stat}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
                <div>
                  <p className="text-center">코리아티엠 채용연구소</p>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="text-center" style={{ marginBottom: "100px" }}>
          {!ArrOn3 ? null : (
            <>
              <div
                id="capture3"
                className="bg-white p-3 border mt-2"
                style={{
                  width: "700px",
                  height: "700px",
                  overflow: "hidden",
                  margin: "0 auto",
                }}
              >
                <h5 className="fw-bold">면접자 리스트 - {Today}</h5>
                <Table size="sm" style={{ fontSize: "0.8em" }}>
                  <thead
                    className="bg-warning"
                    style={{ borderBottomWidth: "2px" }}
                  >
                    <tr>
                      <td className="border-start border-end border-top border-dark">
                        순서
                      </td>
                      <td className="border-end border-top border-dark">
                        면접일시
                      </td>
                      <td className="border-end border-top border-dark">
                        이름
                      </td>
                      <td className="border-end border-top border-dark">
                        나이
                      </td>
                      <td className="border-end border-top border-dark">
                        성별
                      </td>
                      <td className="border-end border-top border-dark">
                        면접결과
                      </td>
                      <td className="border-end border-top border-dark">
                        진행상황
                      </td>
                    </tr>
                  </thead>
                  <tbody style={{ backgroundColor: "#ffe" }}>
                    {Array3.map(array => {
                      return (
                        <tr
                          key={array.id}
                          style={
                            array.id % 2 === 0
                              ? { backgroundColor: "#fafafa" }
                              : { backgroundColor: "#fff" }
                          }
                        >
                          <td className="border-start border-end">
                            {array.id + 1}
                          </td>
                          <td className="border-end">{array.interview}</td>
                          <td className="border-end">{array.name}</td>
                          <td className="border-end">{array.age}</td>
                          <td className="border-end">{array.gender}</td>
                          <td
                            className="border-end"
                            style={
                              array.result === "" ||
                              array.result === null ||
                              array.result === undefined
                                ? {
                                    backgroundColor: "#fce5cd",
                                  }
                                : array.result === "입과"
                                ? { backgroundColor: "#c9daf8" }
                                : null
                            }
                          >
                            {array.result === "합격" ? (
                              <span style={{ color: "red" }}>합격</span>
                            ) : array.result === "진행중" ? (
                              <span style={{ color: "blue" }}>진행중</span>
                            ) : array.result === "입과" ? (
                              <span style={{ color: "blue" }}>입과</span>
                            ) : (
                              <span>{array.result}</span>
                            )}
                          </td>
                          <td className="border-end">{array.stat}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
                <div>
                  <p className="text-center">코리아티엠 채용연구소</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Capture;
