import { Flex, IconButton, Text } from "@chakra-ui/core";
import React from "react";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

interface UpvoteSectionProps {
  post: PostSnippetFragment;
}

export const UpvoteSection: React.FC<UpvoteSectionProps> = ({ post }) => {
  const [, vote] = useVoteMutation();
  return (
    <Flex
      flexDirection="column"
      textAlign="center"
      alignItems="center"
      justifyContent="center"
      mr={3}
    >
      <IconButton
        aria-label="upvote post"
        icon="chevron-up"
        onClick={() => {
          vote({ postID: post.id, value: 1 });
        }}
      />
      <Text>{post.points}</Text>
      <IconButton
        aria-label="downvote post"
        icon="chevron-down"
        onClick={() => {
          vote({ postID: post.id, value: -1 });
        }}
      />
    </Flex>
  );
};
