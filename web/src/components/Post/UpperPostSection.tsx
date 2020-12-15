import { Flex, Text } from "@chakra-ui/react";
import { formatDistance } from "date-fns";
import React from "react";
import { PostSnippetFragment } from "../../generated/graphql";

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
    <Flex>
      <Text ml="4" fontSize="sm">
        (pic) r/pcmasterrace . Posted by u/{creator.username}{" "}
        {formatedCreatedAt} ago
      </Text>
    </Flex>
  );
};
export default UpperPostSection;
