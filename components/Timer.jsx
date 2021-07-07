import React, { useState, useEffect, useRef } from "react";
import { Button, Box, Text, Center } from "@chakra-ui/react";
import { parseCookies, setCookie } from "nookies";
import { useRecoilState, atom } from "recoil";
import { countState } from "../pages/index";
import { PieChart, Pie, Cell } from "recharts";

export function Timer(props) {
  const [hour, setHour] = useState({ min: 0, sec: 2 });
  const [prevTime, setPrevTime] = useState(hour.min * 60 + hour.sec);
  const [id, setId] = useState();
  const [myCount, setCount] = useState(0);
  const refHour = useRef(prevTime);
  const [myCookie, setMyCookie] = useState(null);
  const [counts, setCounts] = useRecoilState(countState);

  useEffect(() => {
    getCookie();
    setCounts(counts);
    console.log("リロードされた時");
  }, []);

  useEffect(() => {
    refHour.current = prevTime;
    if (refHour.current === 0) {
      setCount(myCount + 1);
      clearInterval(id);
      setHour({ min: 0, sec: 5 });
      setCookies(null, Number(counts.count) + 1);
    }
  }, [prevTime]);

  useEffect(() => {
    setPrevTime(hour.min * 60 + hour.sec);
    setMyCookie(counts);
    setCounts(counts);
  }, [hour]);

  const countDown = () => {
    setPrevTime(refHour.current - 1);
  };

  const toTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    if (String(seconds).length < 2) {
      return minutes + ":" + "0" + seconds;
    } else {
      return minutes + ":" + seconds;
    }
  };

  const start = () => {
    setId(setInterval(countDown, 1000));
    getCookie();
  };

  const stop = () => {
    clearInterval(id);
  };

  const increment = () => {
    setPrevTime(refHour.current + 1);
  };

  const decriment = () => {
    setPrevTime(refHour.current - 1);
  };

  function getCookie(ctx) {
    const cookie = parseCookies(ctx);
    setCounts(cookie);
    console.log("普通にタイマーの回数", myCount);
  }

  function setCookies(ctx, token) {
    setCookie(ctx, "count", token, { maxAge: 1 * 60 * 60 });
    // const cookies = parseCookies();
    // setMyCookie(parseCookies());
  }

  const data = [
    { name: 0, value: Number(counts.count) },
    { name: 1, value: 40 - Number(counts.count) },
  ];

  const colors = ["#3D84B8", "white"];

  return (
    <Box>
      <Center>
        <Text fontSize="5xl" color="gray.600">
          {toTime(prevTime)}
        </Text>
        <Box m={4}>
          <Button bg="#2541B2" color="white" m={2} onClick={() => increment()}>
            ▲
          </Button>
          <Button bg="#2541B2" color="white" m={2} onClick={() => decriment()}>
            ▼
          </Button>
        </Box>
        <Text>{counts.count}</Text>
        <PieChart width={150} height={150}>
          <Pie
            data={data}
            dataKey="value"
            x="50%"
            cy="50%"
            outerRadius={50}
            fill="#8884d8"
          >
            {data.map((entry, index) => {
              <Cell key={`cell-${index}`} fill={colors[index]} />;
            })}
          </Pie>
        </PieChart>
      </Center>
      <Center>
        <Button m={4} bg="#1768AC" color="white" onClick={() => start()}>
          Start
        </Button>
        <Button m={4} bg="#1768AC" color="white" onClick={() => stop()}>
          Stop
        </Button>
      </Center>
    </Box>
  );
}
