import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { LandingSection } from "../components/LandingSection";
import landingVector from "../assets/landing-vector.png";
import { AppHeader } from "../components/AppHeader";
import { useState } from "react";
import AppFooter from "../components/AppFooter";
import { useUserAuth } from "../contexts/UserAuthContext";
import { login, signup } from "../api/userAuth";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const [isSignupLoading, setIsSignupLoading] = useState<boolean>(false);
  const [isLoginLoading, setIsLoginLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const { setUser } = useUserAuth();

  const onClickLogin = async () => {
    setIsLoginLoading(true);
    if (username && password) {
      try {
        const data = await login({ username, password });
        const { user } = data;
        if (user) {
          // Update user context
          setUser(user);
          // Redirect
          navigate("/");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoginLoading(false);
      }
    }
  };

  const onClickSignup = async () => {
    if (username && password) {
      try {
        const { user } = await signup({ username, password });
        if (user) {
          // Update user context
          setUser(user);
          // Redirect
          navigate("/");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsSignupLoading(false);
      }
    }
  };

  return (
    <VStack w="full" h="100vh">
      <AppHeader />
      <LandingSection justifyContent="center" mt={{ base: 16, md: 0 }}>
        <Stack
          direction={{ base: "column", md: "row" }}
          align="center"
          gap={{ base: "1.5rem", md: "3.125rem", lg: "7.5rem" }}
        >
          <Flex flexDir="column" flex={1} gap={4}>
            <HStack gap={4} justifyContent={"center"}>
              <Image
                display={{ md: "none", base: "flex" }}
                src={landingVector}
                alt="linkey hero"
                height={16}
              />
              <Text
                textStyle={{
                  base: "h4",
                  md: "responsive-display.heavy",
                }}
                color="base.content.strong"
              >
                A simple tool to shorten your URLs
              </Text>
            </HStack>
            <FormControl>
              <HStack
                alignItems="center"
                justifyContent="space-between"
                gap={4}
              >
                <FormLabel m={0}>Username</FormLabel>
                <Input
                  placeholder="Your cool unique alter ego"
                  w="75%"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </HStack>
            </FormControl>

            <HStack alignItems="center" justifyContent="space-between" gap={4}>
              <FormLabel m={0}>Password</FormLabel>
              <Input
                value={password}
                w="75%"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="A really strong password only you know"
              />
            </HStack>
            <Button
              isLoading={isLoginLoading}
              isDisabled={!username || !password}
              onClick={onClickLogin}
              bg="slate.400"
              borderColor="slate.400"
            >
              Log in
            </Button>
            <Button
              isLoading={isSignupLoading}
              isDisabled={!username || !password}
              onClick={onClickSignup}
              variant="outline"
              color="slate.400"
              borderColor="slate.400"
            >
              Sign up
            </Button>
          </Flex>
          <Flex
            display={{ md: "flex", base: "none" }}
            flex={1}
            aria-hidden
            justify="right"
          >
            <Image src={landingVector} alt="linkey hero" width={"100%"} />
          </Flex>
        </Stack>
      </LandingSection>
      <AppFooter />
    </VStack>
  );
};
export default LandingPage;
