import Head from "next/head";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { parseCookies, setCookie } from "nookies";
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
import { atom, useRecoilState } from "recoil";

export const countState = atom({
  key: "count",
  default: 0,
});

export default function Home() {
  const [username, setUserName] = useState("");
  const handleChange = (event) => setUserName(event.target.value);
  const [myCount, setMyCount] = useRecoilState(countState);

  useEffect(() => {
    getCookie();
  }, []);

  function getCookie(ctx) {
    const cookie = parseCookies(ctx);
    setMyCount(cookie);
    // setCookies(null, 0);
  }

  function setCookies(ctx, token) {
    setCookie(ctx, "count", token, { maxAge: 1 * 60 * 60 });
  }

  function prepareCookie() {
    if (!myCount.count || myCount.count === "NaN") {
      setCookies(null, 0);
    }
  }

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
          <Link href="/main" onClick={prepareCookie()}>
            Mainへ
          </Link>
        ) : (
          <div>Please other username</div>
        )}
      </Center>
    </Box>
  );
}
