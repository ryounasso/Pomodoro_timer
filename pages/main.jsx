import Head from "next/head";
import Image from "next/image";
import React from "react";
import { Heading, Center, Box } from "@chakra-ui/react";
import { Timer } from "../components/Timer";
import { TrelloCard } from "../components/TrelloCard";
import { Calendar } from "../components/Calendar";

export default function Main() {
  return (
    <Box>
      <Center>
        <Heading>Pomodoro Timer</Heading>
      </Center>
      <Timer />
      <Center marginY={8}>
        <TrelloCard />
      </Center>
      <Center marginY={8}>
        <Calendar />
      </Center>
    </Box>
  );
}