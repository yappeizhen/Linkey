import { Flex, Text } from "@chakra-ui/react";
import { AppGrid } from "./AppGrid";

export const AppHeader = (): JSX.Element => {
  return (
    <AppGrid w="full" px="1.5rem" bg="slate.50">
      <Flex
        gridColumn={{ base: "1 / -1", md: "2 / 12" }}
        justify="space-between"
        align="center"
        py={{ base: "0.625rem", md: "3rem" }}
      >
        <Text textStyle="responsive-heading.heavy">Linkey</Text>
      </Flex>
    </AppGrid>
  );
};
