import Head from "next/head";
import Image from "next/image";
import React from "react";
import { Heading, Center, Box } from "@chakra-ui/react";
import { Timer } from "../components/Timer";

export default function Home() {
  return (
    <Box bg="#f5f5f5">
      <Center>
        <Heading>Pomodoro Timer</Heading>
      </Center>
      <Timer />
    </Box>
  );
}
