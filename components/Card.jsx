import React from "react";
import { Button, Box, Text } from "@chakra-ui/react";

export function Card(props) {
  const name = props.name;

  return (
    <Box p={4} maxW="200px" bg="#f5f5f5">
      <Text>{name}</Text>
      <Button colorScheme="green">Done!!</Button>
    </Box>
  );
}
