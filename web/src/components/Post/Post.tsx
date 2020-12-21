import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { PostSnippetFragment } from "../../generated/graphql";
import { BottomPostSection } from "./BottomPostSection";
import UpperPostSection from "./UpperPostSection";
import { UpvoteSection } from "./UpvoteSection";

interface PostProps {
  post: PostSnippetFragment;
}

export const Post: React.FC<PostProps> = ({ post }) => {
  const { id, text, title } = post;

  return (
    <Flex
      p="3"
      mb="3"
      shadow="md"
      borderWidth="1px"
      key={id}
      // cursor="pointer"
    >
      <UpvoteSection post={post} />
      <Flex direction="column">
        <Box flex={1}>
          <UpperPostSection post={post} />
          <Flex direction="column">
            <NextLink href="/post/[id]" as={`/post/${id}`}>
              <Link>
                <Heading fontSize="xl">{title}</Heading>
              </Link>
            </NextLink>
            <Box className="text">
              <Text mt={4}>{text}</Text>
            </Box>
          </Flex>
        </Box>
        <BottomPostSection post={post} />
      </Flex>
    </Flex>
  );
};
