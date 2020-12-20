import { Button, Flex, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import Layout from "../components/Layout";
import { Post } from "../components/Post/Post";
import { usePostsQuery } from "../generated/graphql";

export const Posts: React.FC = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });

  const [{ data, error, fetching }] = usePostsQuery({
    variables,
  });

  if (!fetching && !data) {
    return <div>{error?.message}</div>;
  }
  return (
    <Layout>
      {data && !fetching ? (
        <Stack spacing={2}>
          {data!.posts.posts.map((post, index) =>
            !post ? null : <Post post={post} key={index} />
          )}
        </Stack>
      ) : (
        <div>loading</div>
      )}
      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            isLoading={fetching}
            m="auto"
            my={8}
            onClick={() =>
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
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
