import { useApolloClient } from "@apollo/client";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  useColorModeValue,
} from "@chakra-ui/react";
import NextImage from "next/image";
import NextLink from "next/link";
import React from "react";
import { FaPlus, FaUser } from "react-icons/fa";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import ColorMode from "./ColorMode";
import { LoginModal } from "./LoginModal";
import { RegisterModal } from "./RegisterModal";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  // const router = useRouter();

  const [logout, { loading: logoutFetching }] = useLogoutMutation();

  const apolloClient = useApolloClient();

  const { data, loading } = useMeQuery({ skip: isServer() });

  const bgColor = useColorModeValue("#F7FAFC", "#2D3748");
  // const color = useColorModeValue("#242526", "#E4E6EB");
  let body = null;

  // data is loading
  if (loading) {
  }

  // user not logged in
  else if (!data?.me) {
    body = (
      <>
        <Box mr="auto">
          <NextLink href="/">
            <Flex alignItems="center" cursor="pointer">
              <NextImage src="/logo.svg" alt="Logo" width={60} height={60} />
              <Heading ml="1" mr="4">
                LiReddit
              </Heading>
            </Flex>
          </NextLink>
        </Box>

        <Box ml="auto">
          <LoginModal text="Login" />

          <RegisterModal text="Register" />
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<FaUser />}
              aria-label="Profile"
            />
            <MenuList>
              <MenuGroup title="View Options">
                <MenuItem as={Box} ml="auto">
                  Toggle mode <ColorMode buttonSize="md" mLeft="2" />
                </MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuGroup>
                <MenuItem>
                  <LoginModal text="Log In / Sign Up" useButton={false} />
                </MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
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
          </Flex>
        </Box>

        <Box ml="auto">
          <Flex alignItems="center">
            <Box mr="2">
              <NextLink href="create-post">
                <IconButton
                  as={Link}
                  ml="auto"
                  aria-label="Create post"
                  icon={<FaPlus />}
                />
              </NextLink>
            </Box>
            <Menu>
              <MenuButton as={Button}>{data.me.username}</MenuButton>
              <MenuList>
                <MenuGroup title="View Options">
                  <MenuItem as={Box} ml="auto" mr="auto">
                    Toggle mode <ColorMode buttonSize="md" mLeft="2" />
                  </MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup>
                  <MenuItem
                    onClick={async () => {
                      await logout();
                      apolloClient.resetStore();
                    }}
                    isLoading={logoutFetching}
                  >
                    Logout
                  </MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          </Flex>
        </Box>
      </>
    );
  }
  return (
    <Flex position="sticky" top={0} zIndex={1} bg={bgColor} p={3}>
      <Flex flex={1} maxW={1200} align="center" m="auto">
        {body}
      </Flex>
    </Flex>
  );
};
