import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import styled from "@emotion/styled";

function Clock() {
  const Clock = styled.div`
    position: fixed;
    bottom: 10px;
    right: 10px;
    background-color: #fff;
    font-size: 0.9em;
    border: 1px solid #ccc;
    @media (max-width: 1156px) {
      display: none;
    }
  `;
  const [Time, setTime] = useState("");
  let now = dayjs();

  useEffect(() => {
    const id = setInterval(() => {
      setTime(now.format("YYYY년 MM월 DD일 HH:mm:ss"));
    }, 1000);
    return () => clearInterval(id);
  }, [now, Time]);
  return <Clock className="rounded-pill py-2 px-3">{Time}</Clock>;
}

export default Clock;
