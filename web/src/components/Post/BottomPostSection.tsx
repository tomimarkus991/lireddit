import {
  Box,
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  PostSnippetFragment,
  useDeletePostMutation,
  // useHidePostMutation,
  useMeQuery,
} from "../../generated/graphql";

interface BottomPostSectionProps {
  post: PostSnippetFragment;
}

export const BottomPostSection: React.FC<BottomPostSectionProps> = ({
  post,
}) => {
  const [, deletePost] = useDeletePostMutation();
  // const [, hidePost] = useHidePostMutation();
  const [{ data: meData }] = useMeQuery();
  return (
    <Flex>
      <Box mr="2">
        <Text>Comments</Text>
      </Box>
      <Menu>
        <MenuButton as={Button} size="sm">
          <BsThreeDots />
        </MenuButton>
        <MenuList>
          {meData?.me?.id === post.creator.id ? (
            <>
              {/* <MenuItem
                onClick={() => {
                  hidePost({ id: post.id, isHidden: post.isHidden });
                }}
              >
                <Flex direction="row" w="100%" align="center">
                  <Icon as={FaAmazon} w={6} h={6} color="red.500" mr="2" />
                  <Text mr="2">Hide</Text>
                </Flex>
              </MenuItem> */}
              <MenuItem
                onClick={() => {
                  deletePost({ id: post.id });
                }}
              >
                <Flex direction="row" w="100%" align="center">
                  <Icon as={FaTrash} w={6} h={6} color="red.500" mr="2" />
                  <Text mr="2">Delete</Text>
                </Flex>
              </MenuItem>
              <MenuItem>
                <NextLink href="/post/edit/[id]" as={`/post/edit/${post.id}`}>
                  <Flex direction="row" w="100%" align="center">
                    <Icon as={FaEdit} w={6} h={6} color="blue.500" mr="2" />
                    <Text mr="2">Edit</Text>
                  </Flex>
                </NextLink>
              </MenuItem>
            </>
          ) : null}
        </MenuList>
      </Menu>
    </Flex>
  );
};
