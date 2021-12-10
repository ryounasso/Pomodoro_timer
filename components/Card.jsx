import React from "react";
import { Button, Box, Text } from "@chakra-ui/react";

export function Card(props) {
  const name = props.name;

  return (
    <Box p={4} maxW="200px" bg="#F0E5CF" borderRadius="md" shadow="md">
      <Text color="#302e29">{name}</Text>
      <Button bg="#E8F0F2">Done!!</Button>
    </Box>
  );
}
