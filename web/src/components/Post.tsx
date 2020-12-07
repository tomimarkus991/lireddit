import { Box, Flex, Heading, Text } from "@chakra-ui/core";
import { formatDistance } from "date-fns";
import React from "react";
import { PostSnippetFragment } from "../generated/graphql";
import { UpvoteSection } from "./UpvoteSection";

interface PostProps {
  post: PostSnippetFragment;
}

export const Post: React.FC<PostProps> = ({ post }) => {
  const { id, title, textSnippet, createdAt, creator } = post;

  const formatedCreatedAt = formatDistance(
    new Date(),
    new Date(parseInt(createdAt))
  ).toString();
  return (
    <Flex p={3} shadow="md" borderWidth="1px" key={id}>
      <UpvoteSection post={post} />
      <Box>
        <Heading fontSize="xl">{title}</Heading>
        <Flex justifyItems="flex-end">
          <Text ml="auto">
            Posted by u/{creator.username} {formatedCreatedAt} ago
          </Text>
        </Flex>
        <Text mt={4}>{textSnippet}</Text>
      </Box>
    </Flex>
  );
};
