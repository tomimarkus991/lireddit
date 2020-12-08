import { Flex, Heading, Text } from "@chakra-ui/core";
import { formatDistance } from "date-fns";
import { title } from "process";
import React from "react";
import { PostSnippetFragment } from "../generated/graphql";

interface UpperPostSectionProps {
  post: PostSnippetFragment;
}

const UpperPostSection: React.FC<UpperPostSectionProps> = ({ post }) => {
  const { creator, createdAt } = post;
  const formatedCreatedAt = formatDistance(
    new Date(),
    new Date(parseInt(createdAt))
  ).toString();
  return (
    <Flex textAlign="center" justifyContent="center" flexWrap="unset">
      <Heading fontSize="xl">{title}</Heading>
      <Text ml="4" fontSize="sm">
        Posted by u/{creator.username} {formatedCreatedAt} ago
      </Text>
    </Flex>
  );
};
export default UpperPostSection;
