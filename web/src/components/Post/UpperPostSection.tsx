import { Box, Flex, IconButton, Link, Text } from "@chakra-ui/react";
import { formatDistance } from "date-fns";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  PostSnippetFragment,
  useDeletePostMutation,
  useMeQuery,
  UserSnippetFragment,
} from "../../generated/graphql";
import NextLink from "next/link";

interface UpperPostSectionProps {
  post: PostSnippetFragment;
}

const UpperPostSection: React.FC<UpperPostSectionProps> = ({ post }) => {
  const [, deletePost] = useDeletePostMutation();
  const [{ data: meData }] = useMeQuery();
  const { creator, createdAt } = post;
  const formatedCreatedAt = formatDistance(
    new Date(),
    new Date(parseInt(createdAt))
  ).toString();
  return (
    <Flex>
      (pic) r/pcmasterrace . Posted by
      <NextLink href="/user/[id]" as={`/user/${creator.id}`}>
        <Link>
          <Text>{creator.username}</Text>
        </Link>
      </NextLink>
      <Text ml="2">{formatedCreatedAt} ago</Text>
      {meData?.me?.id === post.creator.id ? (
        <>
          <IconButton
            ml="auto"
            mr="2"
            icon={<FaTrash />}
            aria-label="delete"
            colorScheme="red"
            onClick={() => {
              deletePost({ id: post.id });
            }}
          />
          <NextLink href="/post/edit/[id]" as={`/post/edit/${post.id}`}>
            <IconButton
              icon={<FaEdit />}
              aria-label="edit"
              colorScheme="blue"
            />
          </NextLink>
        </>
      ) : null}
    </Flex>
  );
};
export default UpperPostSection;
