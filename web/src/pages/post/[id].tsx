import { Box, Heading, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React from "react";
import Layout from "../../components/Layout";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useGetPostFromUrl } from "../../utils/useGetPostFromUrl";

const Post = ({}) => {
  const [{ data, error, fetching }] = useGetPostFromUrl();

  if (fetching) {
    return (
      <Layout>
        <Box>
          <Text>Loading...</Text>
        </Box>
      </Layout>
    );
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  if (!data?.post) {
    return (
      <Layout>
        <Box>Could not find post</Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Heading mb={4}>{data.post.title}</Heading>
      {data.post.text}
      Creator: {data.post.creator.username}
    </Layout>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
