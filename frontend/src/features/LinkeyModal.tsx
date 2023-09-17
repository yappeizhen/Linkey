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

const LinkeyModal = ({
  isOpen,
  onClose,
  id,
}: {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}) => {
  const url = `${window.location.origin}/snip/${id}`;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent h="60%" w="90%">
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
              h={40}
              borderColor="grey"
              p={4}
              overflowY="scroll"
            >
              <Text textAlign="center" textStyle="subhead-3" mb={2}>
                LALALA
              </Text>
            </Box>
            <Box
              w="100%"
              h={12}
              borderRadius={10}
              display="flex"
              textAlign="center"
              justifyContent="center"
              alignItems="center"
              border="1px"
              borderColor="green.200"
              color="green.500"
              overflowX="auto"
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
