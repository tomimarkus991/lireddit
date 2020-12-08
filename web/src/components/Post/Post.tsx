import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { PostSnippetFragment } from "../../generated/graphql";
import UpperPostSection from "./UpperPostSection";
import { UpvoteSection } from "./UpvoteSection";

interface PostProps {
  post: PostSnippetFragment;
}

export const Post: React.FC<PostProps> = ({ post }) => {
  const { id, textSnippet, title } = post;

  return (
    <Flex p="3" mb="3" shadow="md" borderWidth="1px" key={id}>
      <UpvoteSection post={post} />
      <Box>
        <UpperPostSection post={post} />
        <Flex direction="column">
          <Box>
            <Heading fontSize="xl">{title}</Heading>
          </Box>
          <Box>
            <Text mt={4}>{textSnippet}</Text>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};
