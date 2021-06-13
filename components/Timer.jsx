import React, { useState, useEffect, useRef } from "react";
import { Button } from "@chakra-ui/react";

export function Timer() {
  const [hour, setHour] = useState({ min: 30, sec: 0 });
  const [prevTime, setPrevTime] = useState(hour.min * 60 + hour.sec);
  const [id, setId] = useState();
  const refHour = useRef(prevTime);

  useEffect(() => {
    refHour.current = prevTime;
  }, [prevTime]);

  //   useEffect(() => {
  //     setId(setInterval(countDown, 1000));
  //   }, []);

  const countDown = () => {
    setPrevTime(refHour.current - 1);
    console.log(prevTime);
  };

  const toTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return minutes + ":" + seconds;
  };

  const start = () => {
    setId(setInterval(countDown, 1000));
  };

  const stop = () => {
    clearInterval(id);
  };

  return (
    <div>
      {toTime(refHour.current)}
      <Button onClick={() => start()}>Start</Button>
      <Button onClick={() => stop()}>Stop</Button>
    </div>
  );
}
