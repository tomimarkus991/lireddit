import { Flex, Link, Text } from "@chakra-ui/react";
import { formatDistance } from "date-fns";
import NextLink from "next/link";
import React from "react";
import { BsDot } from "react-icons/bs";
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
    <Flex align="center" color="gray.500">
      (pic) r/pcmasterrace
      <BsDot />
      Posted by&nbsp;
      <NextLink href="/user/[id]" as={`/user/${creator.id}`}>
        <Link>
          <Text>u/{creator.username}</Text>
        </Link>
      </NextLink>
      <Text ml="2">{formatedCreatedAt} ago</Text>
    </Flex>
  );
};
export default UpperPostSection;
