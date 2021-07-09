import React, { useState, useEffect, useRef } from "react";
import { Button, Box, Text, Center, VStack } from "@chakra-ui/react";
import { parseCookies, setCookie } from "nookies";
import { useRecoilState, atom } from "recoil";
import { countState } from "../pages/index";
import { PieChart, Pie, Cell } from "recharts";

export function Timer() {
  const [hour, setHour] = useState({ min: 0, sec: 10 });
  const [prevTime, setPrevTime] = useState(hour.min * 60 + hour.sec);
  const [id, setId] = useState();
  const [myCount, setCount] = useState(0);
  const refHour = useRef(prevTime);
  const [myCookie, setMyCookie] = useState(null);
  const [counts, setCounts] = useRecoilState(countState);
  const [isSet, setIsSet] = useState(false);

  useEffect(() => {
    getCookie();
  }, []);

  useEffect(() => {
    setCount(counts.count);
    console.log(counts.count);
  }, [isSet]);

  useEffect(() => {
    refHour.current = prevTime;
    if (refHour.current === 0) {
      if (Number(counts.count) % 2 === 1) {
        setCount(Number(myCount) + 1);
        clearInterval(id);
        setHour({ min: 0, sec: 5 });
        setCookies(null, Number(counts.count) + 1);
      } else {
        // setCount(myCount + 1);
        clearInterval(id);
        setHour({ min: 0, sec: 10 });
        setCookies(null, Number(counts.count) + 1);
      }
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
    if (!isSet) {
      if (counts) {
        setIsSet(true);
      }
    }
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
  }

  function setCookies(ctx, token) {
    const date = setExpireDate();
    setCookie(ctx, "count", token, { expires: date });
  }

  function setExpireDate() {
    const currentTime = new Date();
    const tomorrowDate = new Date(
      currentTime.getFullYear(),
      currentTime.getMonth(),
      currentTime.getDate(),
      23,
      59
    );
    return tomorrowDate;
  }

  const data = [
    { name: 0, value: Number(myCount) },
    { name: 1, value: 18 - Number(myCount) },
  ];

  const COLORS = ["#3D84B8", "white"];

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
        <VStack>
          <PieChart width={150} height={100}>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              x="50%"
              cy="50%"
              outerRadius={50}
              fill="#8884d8"
            >
              {data.map((item, index) => {
                return <Cell key={index} fill={COLORS[index]} />;
              })}
            </Pie>
          </PieChart>
          <Text fontSize="3xl">{myCount}</Text>
        </VStack>
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
