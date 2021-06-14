import React, { useState, useEffect, useRef } from "react";
import { Button, Box, Text, Center } from "@chakra-ui/react";

export function Timer() {
  const [hour, setHour] = useState({ min: 30, sec: 0 });
  const [prevTime, setPrevTime] = useState(hour.min * 60 + hour.sec);
  const [id, setId] = useState();
  const refHour = useRef(prevTime);
  let restTime;

  useEffect(() => {
    refHour.current = prevTime;
  }, [prevTime]);

  useEffect(() => {
    restTime = toTime(refHour.current);
  }, [refHour.current]);

  const countDown = () => {
    setPrevTime(refHour.current - 1);
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

  const increment = () => {
    setPrevTime(refHour.current + 1);
  };

  const decriment = () => {
    setPrevTime(refHour.current - 1);
  };

  return (
    <Box>
      <Center>
        <Text fontSize="5xl" color="gray.600">
          {restTime}
        </Text>
        <Box m={4}>
          <Button colorScheme="blue" m={2} onClick={() => increment()}>
            ▲
          </Button>
          <Button colorScheme="blue" m={2} onClick={() => decriment()}>
            ▼
          </Button>
        </Box>
      </Center>
      <Center>
        <Button m={4} onClick={() => start()}>
          Start
        </Button>
        <Button m={4} onClick={() => stop()}>
          Stop
        </Button>
      </Center>
    </Box>
  );
}
