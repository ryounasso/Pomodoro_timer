import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import { Heading, Button } from "@chakra-ui/react";
import { Timer } from "../components/Timer";

export default function Home() {
  return (
    <div>
      <Heading>Pomodoro Timer</Heading>
      <Timer />
    </div>
  );
}
