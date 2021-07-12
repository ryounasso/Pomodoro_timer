import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  Button,
  Center,
  Text,
  Box,
} from "@chakra-ui/react";

export function TimerModal(props) {
  const isOpen = props.isOpen;
  const onOpen = props.onOpen;
  const onClose = props.onClose;
  const getCookie = props.getCookie;
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <Center>
            <Box>
              <Text fontSize="3xl" marginTop="16px">
                Time Up!
              </Text>
            </Box>
          </Center>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                onClose();
                getCookie();
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
