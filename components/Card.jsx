import React from "react";
import { Button, Box, Text } from "@chakra-ui/react";

export function Card(props) {
  const name = props.name;

  return (
    <Box p={4} maxW="200px" bg="#A2DBFA" borderRadius="md" shadow="md">
      <Text>{name}</Text>
      <Button bg="#E8F0F2">Done!!</Button>
    </Box>
  );
}
