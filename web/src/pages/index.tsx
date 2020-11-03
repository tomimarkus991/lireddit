import { Box, Heading, Link, Stack, Text } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React from "react";
import Layout from "../components/Layout";
import { PostComp } from "../components/PostComp";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  const [{ data, fetching }] = usePostsQuery({
    variables: {
      limit: 10,
    },
  });
  return (
    <Layout>
      <NextLink href="create-post">
        <Link>Create post</Link>
      </NextLink>
      <br />
      {data && !fetching ? (
        <Stack spacing={2}>
          {data!.posts.map((post) => (
            <PostComp
              postID={post.id}
              title={post.title}
              desc={post.textSnippet}
            />
          ))}
        </Stack>
      ) : (
        <div>loading</div>
      )}
    </Layout>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
