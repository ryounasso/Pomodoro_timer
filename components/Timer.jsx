import React, { useState, useEffect } from "react";
import { Button } from "@chakra-ui/react";

export function Timer() {
  const [hour, setHour] = useState({ min: 30, sec: 0 });
  const [isRun, setIsRun] = useState(false);

  let restTime = hour.min * 60 + hour.sec;

  const countDown = () => {
    let newRestTime = restTime - 1;
    return newRestTime;
  };

  const toTime = () => {
    let time = countDown();
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    setHour({ min: minutes, sec: seconds });
  };

  useEffect(() => {
    const id = setInterval(() => {
      toTime();
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, [hour]);

  return (
    <div>
      {hour.min} : {hour.sec}
      <Button onClick={() => setIsRun(!isRun)}>Time</Button>
    </div>
  );
}
