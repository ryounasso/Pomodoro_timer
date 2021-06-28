import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import {
  Center,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
  const [username, setUserName] = useState("");
  const handleChange = (event) => setUserName(event.target.value);

  return (
    <Box>
      <Center>
        <FormControl id="username" width="220px" marginBottom="8px">
          <FormLabel>User Name</FormLabel>
          <Input placeholder="input your username" onChange={handleChange} />
          <FormHelperText>Please enter username.</FormHelperText>
        </FormControl>
      </Center>
      <Center>
        {username === process.env.NEXT_PUBLIC_USERNAME ? (
          <Link href="/main">Mainへ</Link>
        ) : null}
      </Center>
    </Box>
  );
}
