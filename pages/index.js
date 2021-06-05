import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";

export default function Home() {
  const [hour, setHour] = useState("25:00");
  return (
    <div>
      <p>Pomodoro Timer</p>
      <p>{hour}</p>
      <button onClick={() => setHour("30:00")}>Start</button>
    </div>
  );
}
