import React, { useState, useEffect, useRef } from "react";
import { Button } from "@chakra-ui/react";

export function Timer() {
  const [hour, setHour] = useState({ min: 30, sec: 0 });
  const [prevTime, setPrevTime] = useState(hour.min * 60 + hour.sec);
  const [isRun, setIsRun] = useState(false);
  const [id, setId] = useState();

  const countDown = () => {
    const restTime = hour.min * 60 + hour.sec;
    let newRestTime = restTime - 1;
    setPrevTime(prevTime - 1);
    console.log("restTime", prevTime);
    return newRestTime;
  };

  const toTime = () => {
    const time = countDown();
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    setHour({ min: minutes, sec: seconds });
    console.log("time", time);
    console.log(hour);
  };

  const start = () => {
    if (!isRun) {
      setId(setInterval(toTime, 1000));
      setIsRun(true);
    }
    console.log(isRun);
  };

  const stop = () => {
    if (isRun) {
      clearInterval(id);
      setIsRun(false);
    }
    console.log("stop", prevTime);
  };

  useEffect(() => {
    if (!isRun) {
      setId(setInterval(toTime, 1000));
    } else {
      clearInterval(id);
    }
    console.log(isRun);
    return () => clearInterval(id);
  }, [isRun]);

  return (
    <div>
      {hour.min} : {hour.sec}
      <Button onClick={() => setIsRun(true)}>Start</Button>
      <Button onClick={() => setIsRun(false)}>Stop</Button>
    </div>
  );
}
