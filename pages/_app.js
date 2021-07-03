import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import { parseCookies } from "nookies";
import { PersistenceObserver } from "./persistenceObserver";

function MyApp({ Component, pageProps, ctx }) {
  const initializeState = ({ set }) => {
    const cookie = parseCookies(ctx);
    if (cookie?.count) {
      const count = JSON.parse(cookie.count);
      if (count) {
        set({ key: "count" }, count);
      }
    }
  };
  return (
    <RecoilRoot initializeState={initializeState}>
      <ChakraProvider>
        <Component {...pageProps} />
        <PersistenceObserver ctx={ctx} />
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default MyApp;
