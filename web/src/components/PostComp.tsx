import { Box, Heading, Text } from "@chakra-ui/core";
import React from "react";

interface PostCompProps {
  postID: number;
  title: string;
  desc: string;
}

export const PostComp: React.FC<PostCompProps> = ({ postID, title, desc }) => {
  return (
    <Box p={5} shadow="md" borderWidth="1px" key={postID}>
      <Heading fontSize="xl">{title}</Heading>
      <Text mt={4}>{desc}</Text>
    </Box>
  );
};
