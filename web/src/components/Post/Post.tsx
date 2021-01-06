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
        <UpperPostSection post={post} />
        <NextLink href="/post/[id]" as={`/post/${id}`}>
          <Link>
            <Heading fontSize="xl">{title}</Heading>
          </Link>
        </NextLink>
        {text.length < 400 ? (
          <Box className="text-small">
            <Text mt={4}>{text}</Text>
          </Box>
        ) : (
          <Box className="text-large">
            <Text mt={4}>{text}</Text>
          </Box>
        )}
        <BottomPostSection post={post} />
      </Flex>
    </Flex>
  );
};
