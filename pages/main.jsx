import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Heading, Center, Box } from "@chakra-ui/react";
import { Timer } from "../components/Timer";
import { TrelloCard } from "../components/TrelloCard";
import { Calendar } from "../components/Calendar";
import { useRecoilValue } from "recoil";
import { bgColorState } from "../store/bgColor";

export default function Main() {
  const bgColor = useRecoilValue(bgColorState);

  return (
    <Box bg={bgColor} minHeight="100vh">
      <Center pt={8}>
        <Heading>Pomodoro Timer</Heading>
      </Center>
      <Timer />
      <TrelloCard />
      <Center marginY={14}>
        <Calendar />
      </Center>
    </Box>
  );
}
