import { Grid, type GridProps } from "@chakra-ui/react";

export const AppGrid = (props: GridProps) => (
  <Grid
    columnGap={{ base: "0.5rem", lg: "1rem" }}
    templateColumns={{ base: "repeat(4, 1fr)", md: "repeat(12, 1fr)" }}
    {...props}
  />
);
