import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Box,
  Text,
  Center,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { parseCookies, setCookie } from "nookies";
import { useRecoilState } from "recoil";
import { countState } from "../pages/index";
import { PieChart, Pie, Cell } from "recharts";
import { TimerModal } from "./TimerModal";

export function Timer() {
  const [hour, setHour] = useState({ min: 25, sec: 0 });
  const [prevTime, setPrevTime] = useState(hour.min * 60 + hour.sec);
  const [id, setId] = useState();
  const [myCount, setCount] = useState(0);
  const refHour = useRef(prevTime);
  const [counts, setCounts] = useRecoilState(countState);
  const [isSet, setIsSet] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    getCookie();
    setIsSet(true);
  }, []);

  useEffect(() => {
    getCookie();
  }, [isSet]);

  useEffect(() => {
    refHour.current = prevTime;
    if (refHour.current === 0) {
      if (Number(counts.count) % 2 === 0) {
        setCount(Number(myCount) + 1);
        clearInterval(id);
        setHour({ min: 5, sec: 0 });
        setCookies(null, Number(counts.count) + 1);
        onOpen();
      } else {
        clearInterval(id);
        setHour({ min: 25, sec: 0 });
        setCookies(null, Number(counts.count) + 1);
        onOpen();
      }
    }
  }, [prevTime]);

  useEffect(() => {
    setPrevTime(hour.min * 60 + hour.sec);
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
    { name: 0, value: parseInt(counts.count / 2) },
    { name: 1, value: 18 - parseInt(counts.count / 2) },
  ];

  const COLORS = ["#3D84B8", "white"];

  return (
    <Box>
      <TimerModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        getCookie={getCookie}
      />
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
          {counts.count === "NaN" ? null : (
            <Text fontSize="3xl">{parseInt(counts.count / 2)}</Text>
          )}
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
