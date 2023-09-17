import {
  Button,
  Flex,
  FormControl,
  HStack,
  IconButton,
  Image,
  Input,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  keyframes,
} from "@chakra-ui/react";
import { LandingSection } from "../components/LandingSection";
import dashboardVector from "../assets/dashboard-vector.jpg";
import { FaArrowDown, FaTrash } from "react-icons/fa";
import { AppHeader } from "../components/AppHeader";
import { useEffect, useState } from "react";
import { createLink, deleteLink, getUserLinks } from "../api/links";
import AppFooter from "../components/AppFooter";
import { useUserAuth } from "../contexts/UserAuthContext";
import { GetUserLinkRes } from "../types/links";
import LoadingPage from "./LoadingPage";
import LinkeyModal from "../components/LinkeyModal";

const moveDown = keyframes({
  "0%": {
    transform: "translate(0, 0px)",
  },
  "50%": {
    transform: "translate(0, -6px)",
  },
  "75%": {
    transform: "translate(0, -6px)",
  },
  "100%": {
    transform: "translate(0, 0px)",
  },
});

const MainDashboardPage = () => {
  const { user, isAuthLoading } = useUserAuth();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [originUrl, setOriginUrl] = useState<string>("");
  const [newLink, setNewLink] = useState<GetUserLinkRes | undefined>(undefined);
  const [userLinks, setUserLinks] = useState<GetUserLinkRes[]>([]);

  useEffect(() => {
    if (!user) return;
    setIsFetching(true);
    getUserLinks(user.id)
      .then((links) => {
        setUserLinks(links);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsFetching(false));
  }, [newLink, user]);

  const onSubmit = async () => {
    if (!user) return;
    setIsLoading(true);
    if (originUrl) {
      try {
        const newLink = await createLink({
          userId: user.id,
          originalUrl: originUrl,
        });
        setNewLink(newLink);
        setUserLinks([newLink, ...userLinks]);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const onDelete = async (linkId: number) => {
    try {
      await deleteLink(linkId);
      const updateLinks = userLinks.filter((item) => {
        return item.id !== linkId;
      });
      setUserLinks(updateLinks);
    } catch (err) {
      console.error(err);
    }
  };

  if (isAuthLoading) return <LoadingPage />;

  return (
    <>
      <VStack w="full" h="100vh">
        {newLink && (
          <LinkeyModal
            isOpen={!!newLink}
            onClose={() => {
              setOriginUrl("");
              setNewLink(undefined);
            }}
            link={newLink}
          />
        )}
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
                  src={dashboardVector}
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
                  Paste your URL here, and Linkey will shorten it for you
                </Text>
              </HStack>
              <FormControl>
                <HStack
                  alignItems="center"
                  justifyContent="space-between"
                  gap={4}
                >
                  <Input
                    placeholder="https://this-is-a-very-long-url.com"
                    value={originUrl}
                    onChange={(e) => setOriginUrl(e.target.value)}
                  />
                </HStack>
              </FormControl>

              <Button
                isLoading={isLoading}
                isDisabled={!originUrl}
                onClick={onSubmit}
              >
                Shorten URL
              </Button>
            </Flex>
            <Flex
              display={{ md: "flex", base: "none" }}
              flex={1}
              aria-hidden
              justify="right"
            >
              <Image src={dashboardVector} alt="linkey hero" width={"100%"} />
            </Flex>
          </Stack>
        </LandingSection>
        <Flex w="full" h="100%" justifyContent="center" position="relative">
          <Flex
            w="full"
            justifyContent="center"
            opacity={0.6}
            animation={`${moveDown} 1.5s infinite linear`}
            position={"absolute"}
            bottom={8}
          >
            <FaArrowDown size={30} />
          </Flex>
        </Flex>
      </VStack>
      <VStack
        w="full"
        minH="100vh"
        bg="slate.50"
        p={{ base: 8, sm: 20 }}
        gap={8}
        justifyContent="center"
        alignItems="center"
      >
        <Text textStyle="h1" textAlign="center">
          All your links
        </Text>
        {userLinks.length > 0 ? (
          <VStack w="full">
            <TableContainer h={480} overflowY="auto" overflowX="auto">
              <Table>
                <Thead>
                  <Tr>
                    <Th>No.</Th>
                    <Th>Origin URL</Th>
                    <Th>Shortened URL</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody textStyle={"body-1"}>
                  {userLinks.map((userLink, idx) => {
                    const url = `${window.location.origin}/short/${userLink.id}`;
                    return (
                      <Tr key={userLink.id}>
                        <Td maxW="300px" overflowX="clip">
                          {idx + 1}
                        </Td>
                        <Td maxW="300px" overflowX="clip">
                          {userLink.originalUrl}
                        </Td>
                        <Td maxW="300px" overflowX="clip">
                          <a href={url} target="_">
                            {url}
                          </a>
                        </Td>
                        <Td maxW="300px" overflowX="clip" textAlign="center">
                          <IconButton
                            aria-label="delete"
                            size="xxs"
                            border="none"
                            variant="ghost"
                            opacity="0.5"
                            _hover={{ opacity: "1" }}
                            icon={<FaTrash />}
                            onClick={() => {
                              onDelete(userLink.id);
                            }}
                          />
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>
            <HStack w="100%" justifyContent="flex-end" zIndex={100} gap={2}>
              {isFetching && <Text>Fetching data...</Text>}
            </HStack>
          </VStack>
        ) : (
          <Text>Create a new link to see them appear here!</Text>
        )}
      </VStack>
      <AppFooter />
    </>
  );
};
export default MainDashboardPage;
