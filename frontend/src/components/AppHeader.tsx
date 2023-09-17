import { Button, Flex, Text } from "@chakra-ui/react";
import { AppGrid } from "./AppGrid";
import { useUserAuth } from "../contexts/UserAuthContext";
import { logout } from "../api/userAuth";

export const AppHeader = (): JSX.Element => {
  const { setUser, user } = useUserAuth();
  const onLogout = () => {
    logout();
    setUser(null);
  };
  return (
    <AppGrid w="full" px="1.5rem" bg="slate.50">
      <Flex
        gridColumn={{ base: "1 / -1", md: "2 / 12" }}
        justify="space-between"
        align="center"
        py={{ base: "0.625rem", md: "3rem" }}
      >
        <Text textStyle="responsive-heading.heavy">Linkey</Text>
        {user && (
          <Button bg="slate.500" border="slate.500" size="s" onClick={onLogout}>
            Log out
          </Button>
        )}
      </Flex>
    </AppGrid>
  );
};
