import React, { useState, useEffect, useRef } from "react";
import { Button, Box, Text, Center } from "@chakra-ui/react";

export function Timer() {
  const [hour, setHour] = useState({ min: 0, sec: 2 });
  const [prevTime, setPrevTime] = useState(hour.min * 60 + hour.sec);
  const [id, setId] = useState();
  const refHour = useRef(prevTime);

  useEffect(() => {
    refHour.current = prevTime;
    if (refHour.current === 0) {
      clearInterval(id);
      setHour({ min: 5, sec: 0 });
    }
  }, [prevTime]);

  useEffect(() => {
    setPrevTime(hour.min * 60 + hour.sec);
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

  return (
    <Box>
      <Center>
        <Text fontSize="5xl" color="gray.600">
          {toTime(prevTime)}
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
