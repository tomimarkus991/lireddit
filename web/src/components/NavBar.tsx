import React from "react";
import { Box, Button, Flex, Link, Text } from "@chakra-ui/core";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";
import ColorMode from "./ColorMode";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();
  let body;
  // data is loading
  if (fetching) {
    body = null;
  }
  // user not logged in
  else if (!data?.me) {
    body = (
      <>
        {" "}
        <NextLink href="login">
          <Link mr={2}>Login</Link>
        </NextLink>
        <NextLink href="register">
          <Link>Register</Link>
        </NextLink>
      </>
    );
  }
  // user logged in
  else {
    body = (
      <Flex>
        <Text mr={2}>{data.me.username}</Text>
        <Button variant="link">Logout</Button>
      </Flex>
    );
  }
  return (
    <Flex bg="tomato" p={4}>
      <ColorMode />
      <Box ml="auto">{body}</Box>
    </Flex>
  );
};
