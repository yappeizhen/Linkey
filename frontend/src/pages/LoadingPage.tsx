import { Spinner, VStack } from "@chakra-ui/react";

const LoadingPage = () => {
  return (
    <VStack w="full" h="100vh" justifyContent="center" alignItems="center">
      <Spinner />
    </VStack>
  );
};
export default LoadingPage;
