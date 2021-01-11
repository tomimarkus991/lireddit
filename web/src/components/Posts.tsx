import { Button, Flex, Stack } from "@chakra-ui/react";
import React from "react";
import Layout from "../components/Layout";
import { Post } from "../components/Post/Post";
import { usePostsQuery } from "../generated/graphql";

export const Posts: React.FC = () => {
  const { data, error, loading, fetchMore, variables } = usePostsQuery({
    variables: {
      limit: 15,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });

  if (!loading && !data) {
    return <div>{error?.message}</div>;
  }

  return (
    <Layout>
      {!data && loading ? (
        <div>loading</div>
      ) : (
        <Stack spacing={2}>
          {data!.posts.posts.map((post, index) => {
            return <Post post={post} key={index} />;
          })}
        </Stack>
      )}
      {/* if there is more data show the button */}
      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            isLoading={loading}
            m="auto"
            my={8}
            onClick={() =>
              fetchMore({
                variables: {
                  limit: variables?.limit,
                  cursor:
                    data.posts.posts[data.posts.posts.length - 1].createdAt,
                },
              })
            }
          >
            Load More
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};
