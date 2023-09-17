import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { GetUserLinkRes } from "../types/links";
import { Link } from "react-router-dom";

const LinkeyModal = ({
  isOpen,
  onClose,
  link,
}: {
  isOpen: boolean;
  onClose: () => void;
  link: GetUserLinkRes;
}) => {
  const url = `${window.location.origin}/short/${link.id}`;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent h="50%" w="90%">
        <ModalHeader>Linkey Created!</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Here is a your shortened URL
          <VStack
            h="100%"
            w="full"
            justifyContent="center"
            alignItems="center"
            gap={4}
          >
            <Box
              border="1px"
              w="100%"
              borderColor="grey"
              p={4}
              display="flex"
              overflowX="auto"
              textAlign="center"
              justifyContent="center"
              alignItems="center"
            >
              <Text textAlign="center" textStyle="subhead-3">
                {link.originalUrl}
              </Text>
            </Box>
            <Box
              w="100%"
              p={4}
              borderRadius={10}
              display="flex"
              textAlign="center"
              justifyContent="center"
              alignItems="center"
              border="1px"
              borderColor="green.300"
              color="green.500"
              overflowX="auto"
              cursor="pointer"
              _hover={{ bg: "green.50" }}
              onClick={() => {
                window.open(url, "_blank");
              }}
            >
              <a href={url} target="_">
                {url}
              </a>
            </Box>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Back to Linkey
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default LinkeyModal;
