import Head from "next/head";
import Image from "next/image";
import React from "react";
import { Heading, Center, Box } from "@chakra-ui/react";
import { Timer } from "../components/Timer";
import { TrelloCard } from "../components/TrelloCard";

export default function Home() {
  return (
    <Box>
      <Center>
        <Heading>Pomodoro Timer</Heading>
      </Center>
      <Timer />
      <Center marginY={8}>
        <TrelloCard />
      </Center>
    </Box>
  );
}
