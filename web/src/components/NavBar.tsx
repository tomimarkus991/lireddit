import React from "react";
import { Box, Button, Flex, Link, Text, useColorMode } from "@chakra-ui/core";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";
import ColorMode from "./ColorMode";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();
  const { colorMode } = useColorMode();
  const bgColor = { light: "#F7FAFC", dark: "#2D3748" };
  const color = { light: "#242526", dark: "#E4E6EB" };
  let body;
  // data is loading
  if (fetching) {
    body = null;
  }
  // user not logged in
  else if (!data?.me) {
    body = (
      <Box ml="auto">
        {" "}
        <NextLink href="login">
          <Link mr={2}>Login</Link>
        </NextLink>
        <NextLink href="register">
          <Link>Register</Link>
        </NextLink>
      </Box>
    );
  }
  // user logged in
  else {
    body = (
      <Box mr="auto">
        <Flex>
          <Text color={color[colorMode]} mr={2}>
            {data.me.username}
          </Text>
          <Button color={color[colorMode]} variant="link">
            Logout
          </Button>
        </Flex>
      </Box>
    );
  }
  return (
    <Flex bg={bgColor[colorMode]} p={3} align="center">
      {body}
      <ColorMode />
    </Flex>
  );
};
