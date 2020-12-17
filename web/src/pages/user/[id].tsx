import { Box, Heading, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import Layout from "../../components/Layout";
import { useUserQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";

const User: React.FC = () => {
  const router = useRouter();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const [{ data, error, fetching }] = useUserQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });
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
  if (!data?.user) {
    return (
      <Layout>
        <Box>Could not find the user</Box>
      </Layout>
    );
  }
  const { id, username, email } = data.user;
  return (
    <Layout>
      <Heading mb={4}>{username}</Heading>
      {email}
      Creator: {id}
    </Layout>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(User);
