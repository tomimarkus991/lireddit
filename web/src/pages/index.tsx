import { Button, Flex, Heading, Link, Stack } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React, { useState } from "react";
import Layout from "../components/Layout";
import { Post } from "../components/Post/Post";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 33,
    cursor: null as null | string,
  });
  // console.log(variables);

  const [{ data, fetching }] = usePostsQuery({
    variables,
  });
  // console.log("data", data);

  if (!fetching && !data) {
    return <div>Query Failed for some reason</div>;
  }
  return (
    <Layout>
      <Flex align="center">
        <Heading>LiReddit</Heading>
        <NextLink href="create-post">
          <Link ml="auto">Create post</Link>
        </NextLink>
      </Flex>
      <br />
      {data && !fetching ? (
        <Stack spacing={2}>
          {data!.posts.posts.map((post) => (
            <Post post={post} />
          ))}
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
export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
