import { Box, Flex, Heading, Text } from "@chakra-ui/core";
import React from "react";
import { fromUnixTime } from "date-fns";

interface PostCompProps {
  postID: number;
  title: string;
  desc: string;
  createdAt: number;
  postCreator: string;
}

export const PostComp: React.FC<PostCompProps> = ({
  postID,
  title,
  desc,
  createdAt,
  postCreator,
}) => {
  return (
    <Box p={5} shadow="md" borderWidth="1px" key={postID}>
      <Flex>
        <Heading fontSize="xl">{title}</Heading>
        <Text ml="auto">by {postCreator}</Text>
      </Flex>
      <Text mt={4}>{desc}</Text>
      <Text mt={4}>{fromUnixTime(createdAt).toString()}</Text>
    </Box>
  );
};
