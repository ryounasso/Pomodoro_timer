import React from "react";
import { VStack, Box, Text, Heading } from "@chakra-ui/react";

export function Schedule(props) {
  const events = props.events;
  return (
    <VStack>
      {events.map((one_event) => {
        return (
          <Box key={one_event.id} bg="#039BE5" p={4} borderRadius="md">
            <Text color="white" marginBottom={4}>
              {one_event.start.dateTime.substr(11, 5)} 〜{" "}
              {one_event.end.dateTime.substr(11, 5)}
            </Text>
            <Heading color="white">{one_event.summary}</Heading>
          </Box>
        );
      })}
    </VStack>
  );
}
