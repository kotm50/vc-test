import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import ApplyEdit from "./ApplyEdit";
import { Secondary } from "../../Style/ApplyCSS";
import html2canvas from "html2canvas";

function Applies(props) {
  const [Year, setYear] = useState(0);
  const [Apply, setApply] = useState(0);
  const [Applies, setApplies] = useState([]);
  const [CaptureIt, setCaptureIt] = useState(false);
  const [CaptureOn, setCaptureOn] = useState(true);
  const [AllOpen, setAllOpen] = useState(false);
  const [AllDay, setAllDay] = useState(false);

  let date = dayjs();
  let now = Number(dayjs().format("YYYYMMDD"));
  let today = [];

  useEffect(() => {
    setYear(date.format("YYYY"));
  }, [date]);

  const getApplyList = () => {
    let body = {
      searchTerm: props.comCode,
    };
    axios
      .post("/api/apply/comcode", body)
      .then(function (response) {
        if (response.data.success) {
          setApply(response.data.applyList.length);
          setApplies([...response.data.applyList]);
        }
      })
      .catch(function (error) {
        alert("요청실패");
        console.log(error);
      })
      .then(function () {});
  };

  useEffect(() => {
    getApplyList();
    // eslint-disable-next-line
  }, []);

  const captureHandler = e => {
    if (CaptureOn) {
      setCaptureIt(true);
      setTimeout(() => {
        onSaveToImg();
      }, 500);
    } else {
      alert("내부정보가 나와있습니다! 확인 후 다시 시도해주세요");
    }
  };
  const onSaveToImg = () => {
    //클릭 이벤트
    const capture = document.querySelector("#capture"); //이미지 저장 영역
    let captureTime = date.format("YYYYMMDDHHmm");
    html2canvas(capture).then(canvas => {
      saveAs(canvas.toDataURL("image/jpg"), "공유" + captureTime + ".jpg");
    });
    setCaptureIt(false);
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

  const openHandler = () => {
    setAllOpen(!AllOpen);
  };

  const todayHandler = () => {
    if (!AllDay) {
      today = Applies.filter(
        apply =>
          now === Number(apply.interview_time.replaceAll("-", "").substr(0, 8))
      );
      setApplies(today);
      setAllDay(true);
    } else {
      getApplyList();
      setAllDay(false);
    }
  };

  return (
    <>
      <h6>지원자 목록 {Apply}명</h6>
      <div className="mb-2">
        <button className="btn btn-primary me-2" onClick={e => openHandler()}>
          전체 세부내용 {AllOpen ? "닫기" : "열기"}
        </button>
        <button
          className={AllDay ? "btn btn-success me-2" : "btn btn-warning me-2"}
          onClick={e => todayHandler()}
        >
          {AllDay ? "전체 지원자" : "당일 지원자"}
        </button>
      </div>
      <div
        className={CaptureIt ? "bg-light py-1 w-75" : "bg-light py-1"}
        id="capture"
      >
        {Applies.sort(
          (a, b) => new Date(a.interview_time) - new Date(b.interview_time)
        ).map((apply, idx) => {
          return (
            <Secondary key={idx}>
              <ApplyEdit
                apply={apply}
                Year={Year}
                idx={idx}
                setCapture={setCaptureOn}
                CaptureIt={CaptureIt}
                AllOpen={AllOpen}
                AllDay={AllDay}
              />
            </Secondary>
          );
        })}
      </div>
      <div className="mt-2">
        <button className="btn btn-primary" onClick={e => captureHandler()}>
          이미지로 저장
        </button>
      </div>
    </>
  );
}

export default Applies;
