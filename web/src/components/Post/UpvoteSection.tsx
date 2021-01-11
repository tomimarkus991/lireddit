import { ApolloCache } from "@apollo/client";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Text } from "@chakra-ui/react";
import gql from "graphql-tag";
import React from "react";
import {
  PostSnippetFragment,
  useVoteMutation,
  VoteMutation,
} from "../../generated/graphql";

interface UpvoteSectionProps {
  post: PostSnippetFragment;
}

const updateAfterVote = (
  value: number,
  voteStatus: number,
  postId: number,
  cache: ApolloCache<VoteMutation>
) => {
  const data = cache.readFragment<{
    id: number;
    points: number;
    voteStatus: number | null;
  }>({
    id: "Post:" + postId,
    fragment: gql`
      fragment _ on Post {
        id
        points
        voteStatus
      }
    `,
  });

  if (data) {
    if (data.voteStatus === voteStatus) {
      let newPoints = (data.points as number) - value;
      cache.writeFragment({
        id: "Post:" + postId,
        fragment: gql`
          fragment ___ on Post {
            points
            voteStatus
          }
        `,
        data: {
          points: newPoints,
          voteStatus: 0,
        },
      });

      return;
    }

    const newPoints =
      (data.points as number) + (!data.voteStatus ? 1 : 2) * value;

    cache.writeFragment({
      id: "Post:" + postId,
      fragment: gql`
        fragment __ on Post {
          points
          voteStatus
        }
      `,
      data: {
        points: newPoints,
        voteStatus: value,
      },
    });
  }
};

export const UpvoteSection: React.FC<UpvoteSectionProps> = ({ post }) => {
  const [vote] = useVoteMutation();
  const { voteStatus } = post;
  return (
    <Flex flexDirection="column" alignItems="center" mr={3}>
      <IconButton
        aria-label="upvote post"
        icon={<ChevronUpIcon />}
        colorScheme={voteStatus === 1 ? "green" : undefined}
        onClick={() => {
          vote({
            variables: { postId: post.id, value: 1, voteStatus: 1 },
            update: (cache) => updateAfterVote(1, 1, post.id, cache),
          });
        }}
      />
      <Text>{post.points}</Text>
      <IconButton
        aria-label="downvote post"
        icon={<ChevronDownIcon />}
        colorScheme={voteStatus === -1 ? "red" : undefined}
        onClick={() => {
          vote({
            variables: { postId: post.id, value: -1, voteStatus: -1 },
            update: (cache) => updateAfterVote(-1, -1, post.id, cache),
          });
        }}
      />
    </Flex>
  );
};
