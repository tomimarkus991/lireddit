import {
  Box,
  Button,
  Flex,
  Link,
  Text,
  useColorModeValue,
  Heading,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import ColorMode from "./ColorMode";
import NextImage from "next/image";
import { IoAdd } from "react-icons/io5";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({ pause: isServer() });
  // const { colorMode, toggleColorMode } = useColorMode();

  const bgColor = useColorModeValue("#F7FAFC", "#2D3748");
  const color = useColorModeValue("#242526", "#E4E6EB");
  let body;
  // data is loading
  if (fetching) {
    body = null;
  }
  // user not logged in
  else if (!data?.me) {
    body = (
      <>
        <Box mr="auto">
          <NextLink href="/">
            <Link>
              <Flex alignItems="center">
                <NextImage src="/logo.svg" alt="Logo" width={60} height={60} />
                <Heading ml="1" mr="4">
                  LiReddit
                </Heading>
              </Flex>
            </Link>
          </NextLink>
        </Box>

        <Box ml="auto">
          {" "}
          <NextLink href="login">
            <Link mr={2}>Login</Link>
          </NextLink>
          <NextLink href="register">
            <Link mr={4}>Register</Link>
          </NextLink>
          <ColorMode />
        </Box>
      </>
    );
  }
  // user is logged in
  else {
    body = (
      <>
        <Box mr="auto">
          <Flex alignItems="center">
            <NextLink href="/">
              <Link>
                <Flex alignItems="center">
                  <NextImage
                    src="/logo.svg"
                    alt="Logo"
                    width={60}
                    height={60}
                  />
                  <Heading ml="1" mr="4">
                    LiReddit
                  </Heading>
                </Flex>
              </Link>
            </NextLink>
            <Text color={color} mr={2}>
              {data.me.username}
            </Text>
          </Flex>
        </Box>

        <Box ml="auto">
          <NextLink href="create-post">
            <Link ml="auto">
              <IoAdd />
            </Link>
          </NextLink>
          <Button
            onClick={() => logout()}
            isLoading={logoutFetching}
            mr={4}
            color={color}
            variant="link"
          >
            Logout
          </Button>
          <ColorMode />
        </Box>
      </>
    );
  }
  return (
    <Flex
      position="sticky"
      top={0}
      zIndex={1}
      bg={bgColor}
      p={3}
      align="center"
    >
      {body}
    </Flex>
  );
};
