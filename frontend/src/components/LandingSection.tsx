import { type FC } from "react";
import { Flex, type FlexProps } from "@chakra-ui/react";
import { AppGrid } from "./AppGrid";

export const LandingSection: FC<FlexProps> = ({ bg, children, ...props }) => {
  return (
    <>
      <AppGrid px="1.5rem" bg={bg} mt={{ base: 16, md: 0 }}>
        <Flex
          gridColumn={{ base: "1 / -1", md: "2 / 12" }}
          flexDir="column"
          {...props}
        >
          {children}
        </Flex>
      </AppGrid>
    </>
  );
};
