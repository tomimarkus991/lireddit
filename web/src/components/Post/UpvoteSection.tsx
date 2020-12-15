import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import { PostSnippetFragment, useVoteMutation } from "../../generated/graphql";

interface UpvoteSectionProps {
  post: PostSnippetFragment;
}

export const UpvoteSection: React.FC<UpvoteSectionProps> = ({ post }) => {
  const [, vote] = useVoteMutation();
  const { voteStatus } = post;
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
        icon={<ChevronUpIcon />}
        colorScheme={voteStatus === 1 ? "green" : undefined}
        onClick={() => {
          vote({ postId: post.id, value: 1, voteStatus: 1 });
        }}
      />
      <Text>{post.points}</Text>
      <IconButton
        aria-label="downvote post"
        icon={<ChevronDownIcon />}
        colorScheme={voteStatus === -1 ? "red" : undefined}
        onClick={() => {
          vote({ postId: post.id, value: -1, voteStatus: -1 });
        }}
      />
    </Flex>
  );
};
