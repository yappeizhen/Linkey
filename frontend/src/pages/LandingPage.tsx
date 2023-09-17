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
  useToast,
} from "@chakra-ui/react";
import { LandingSection } from "../components/LandingSection";
import landingVector from "../assets/landing-vector.png";
import { AppHeader } from "../components/AppHeader";
import { useEffect, useState } from "react";
import AppFooter from "../components/AppFooter";
import { useUserAuth } from "../contexts/UserAuthContext";
import { login, signup } from "../api/userAuth";
import { useNavigate } from "react-router-dom";
import LoadingPage from "./LoadingPage";

const LandingPage = () => {
  const toast = useToast({ isClosable: true, duration: 1500 });
  const [isSignupLoading, setIsSignupLoading] = useState<boolean>(false);
  const [isLoginLoading, setIsLoginLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const { isAuthLoading, user, setTokenAndFetchUser } = useUserAuth();

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  const onClickLogin = async () => {
    setIsLoginLoading(true);
    if (username && password) {
      try {
        const data = await login({ username, password });
        if (data.token) {
          // Update context
          setTokenAndFetchUser(data.token);
        } else {
          toast({
            status: "error",
            title: "Authentication Failed",
            description: data.message,
          });
        }
      } catch (err: any) {
        console.error(err);
      } finally {
        setIsLoginLoading(false);
      }
    }
  };

  const onClickSignup = async () => {
    if (username && password) {
      try {
        const data = await signup({ username, password });
        if (data.token) {
          // Update user context
          setTokenAndFetchUser(data.token);
        } else {
          toast({
            status: "error",
            title: "Authentication failed",
            description: data.message,
          });
        }
      } catch (err: any) {
        console.error(err);
      } finally {
        setIsSignupLoading(false);
      }
    }
  };

  if (isAuthLoading) return <LoadingPage />;

  return (
    <VStack w="full" h="100vh">
      <AppHeader />
      <LandingSection justifyContent="center">
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
                type="password"
                placeholder="A really strong password only you know"
              />
            </HStack>
            <Button
              isLoading={isSignupLoading}
              isDisabled={!username || !password}
              onClick={onClickSignup}
            >
              Sign up
            </Button>
            <Button
              isLoading={isLoginLoading}
              isDisabled={!username || !password}
              onClick={onClickLogin}
              variant="outline"
            >
              Log in
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
