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

const LandingPage = () => {
  const [isSignupLoading, setIsSignupLoading] = useState<boolean>(false);
  const [isLoginLoading, setIsLoginLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();

  const onClickLogin = async () => {
    setIsLoginLoading(true);
    if (email && password) {
      try {
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoginLoading(false);
      }
    }
  };

  const onClickSubmit = async () => {
    setIsSignupLoading(true);
    if (email && password) {
      try {
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
      <LandingSection>
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
                <FormLabel m={0}>Email</FormLabel>
                <Input
                  placeholder="Johanna@email.com"
                  w="75%"
                  value={email}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
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
              isDisabled={!email || !password}
              onClick={onClickLogin}
              bg="slate.400"
              borderColor="slate.400"
            >
              Log in
            </Button>
            <Button
              isLoading={isSignupLoading}
              isDisabled={!email || !password}
              onClick={onClickSubmit}
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
