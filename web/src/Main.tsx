import React from "react";
import { Box } from "@chakra-ui/core";

interface MainProps {}

export const Main: React.FC<MainProps> = ({ children }) => {
  return <Box backgroundColor="#18191A">{children}</Box>;
};
