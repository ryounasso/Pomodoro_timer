import React from "react";
import useSWR from "swr";
import Loader from "react-loader-spinner";
import { Center, HStack } from "@chakra-ui/react";
import axios from "axios";
import { Card } from "./Card";

const fetchar = () =>
  axios
    .get(
      "https://api.trello.com/1/lists/" +
        process.env.NEXT_PUBLIC_LIST_TOMORROW +
        "/cards?key=" +
        process.env.NEXT_PUBLIC_KEY +
        "&token=" +
        // process.env.NEXT_PUBLIC_TOKEN +
        process.env.NEXT_PUBLIC_TOKEN
      // "&fields=name"
    )
    .then((res) => res.data);

export function TrelloCard() {
  const { data, error } = useSWR(
    "https://api.trello.com/1/lists/" +
      process.env.NEXT_PUBLIC_LIST_TOMORROW +
      "/cards?key=" +
      process.env.NEXT_PUBLIC_KEY +
      "&token=" +
      // process.env.NEXT_PUBLIC_TOKEN +
      process.env.NEXT_PUBLIC_TOKEN,
    // "&fields=name",

    fetchar
  );

  if (error) return <div>failed to load</div>;
  if (!data)
    return (
      <Center>
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      </Center>
    );

  return (
    <HStack>
      {data.map((oneDate) => {
        return <Card key={oneDate.id} name={oneDate.name} />;
      })}
    </HStack>
  );
}
