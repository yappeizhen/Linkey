import { HStack, Text } from "@chakra-ui/react";
import { FaGithubSquare, FaLinkedin } from "react-icons/fa";

const AppFooter = () => {
  return (
    <HStack
      h={8}
      p={4}
      w="full"
      position="absolute"
      bottom={0}
      alignItems="center"
    >
      <Text
        display="flex"
        alignItems="center"
        whiteSpace="pre"
        lineHeight="1rem"
        fontWeight={500}
        letterSpacing="0.08em"
        fontSize="0.8rem"
      >
        Built with ❤️ by Pei Zhen
      </Text>
      <FaGithubSquare
        cursor="pointer"
        onClick={() =>
          window.open("https://github.com/yappeizhen/Linkey", "_blank")
        }
      />
      <FaLinkedin
        cursor="pointer"
        onClick={() =>
          window.open("https://www.linkedin.com/in/peizhen/", "_blank")
        }
      />
    </HStack>
  );
};
export default AppFooter;
