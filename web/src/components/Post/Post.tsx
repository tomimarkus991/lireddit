import { Box, Flex, Text } from "@chakra-ui/core";
import React from "react";
import { PostSnippetFragment } from "../../generated/graphql";
import UpperPostSection from "./UpperPostSection";
import { UpvoteSection } from "./UpvoteSection";

interface PostProps {
  post: PostSnippetFragment;
}

export const Post: React.FC<PostProps> = ({ post }) => {
  const { id, textSnippet } = post;

  return (
    <Flex p={3} shadow="md" borderWidth="1px" key={id}>
      <UpvoteSection post={post} />
      <Box>
        <UpperPostSection post={post} />
        <Flex>
          <Text mt={4}>{textSnippet}</Text>
        </Flex>
      </Box>
    </Flex>
  );
};
