import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import { Heading } from "@chakra-ui/react";

export default function Home() {
  const [hour, setHour] = useState("25:00");
  return (
    <div>
      <Heading>Pomodoro Timer</Heading>
      <p>{hour}</p>
      <button onClick={() => setHour("30:00")}>Start</button>
    </div>
  );
}
