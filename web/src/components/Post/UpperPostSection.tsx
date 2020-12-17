import { Box, Flex, IconButton, Link, Text } from "@chakra-ui/react";
import { formatDistance } from "date-fns";
import React from "react";
import { FaTrash } from "react-icons/fa";
import {
  PostSnippetFragment,
  useDeletePostMutation,
  UserSnippetFragment,
} from "../../generated/graphql";
import NextLink from "next/link";

interface UpperPostSectionProps {
  post: PostSnippetFragment;
  user: UserSnippetFragment;
}

const UpperPostSection: React.FC<UpperPostSectionProps> = ({ post, user }) => {
  const [, deletePost] = useDeletePostMutation();
  const { creator, createdAt, id } = post;
  const formatedCreatedAt = formatDistance(
    new Date(),
    new Date(parseInt(createdAt))
  ).toString();
  return (
    <Flex>
      <Box flex={1}>
        <Box ml="4">
          (pic) r/pcmasterrace . Posted by{" "}
          <Box>
            <NextLink href="/user/[id]" as={`/user/${creator.id}`}>
              <Link>
                <Text>{creator.username} </Text>
              </Link>
            </NextLink>
          </Box>
        </Box>
        <Text ml="2">{formatedCreatedAt} ago</Text>
      </Box>
      <IconButton
        ml="auto"
        icon={<FaTrash />}
        aria-label="delete"
        colorScheme="red"
        onClick={() => {
          deletePost({ id });
        }}
      />
    </Flex>
  );
};
export default UpperPostSection;
