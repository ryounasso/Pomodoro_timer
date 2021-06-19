import React from "react";
import { Button, Box, Text } from "@chakra-ui/react";

export function Card(props) {
  const name = props.name;
  return (
    <Box borderWidth={2} p={4} maxW="200px" bg="#c0c0c0" mx="auto">
      <Text>{name}</Text>
      <Button colorScheme="green">Done!!</Button>
    </Box>
  );
}
