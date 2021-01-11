import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import Layout from "../../components/Layout";
import { useUserQuery } from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";

const User: React.FC = () => {
  const router = useRouter();
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const { data, error, loading } = useUserQuery({
    skip: intId === -1,
    variables: {
      id: intId,
    },
  });
  if (loading) {
    return null;
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
  const { username, createdAt } = data.user;
  moment.locale("en-nz");

  return (
    <Layout>
      <Flex>
        <Box borderWidth="1px" borderRadius="lg">
          <Box>
            <Heading>{username}</Heading>
          </Box>
          <Box>
            <Text>Cake day</Text>
            <Text>{moment(parseInt(createdAt)).format("ll")}</Text>
          </Box>
        </Box>
      </Flex>
    </Layout>
  );
};
export default withApollo({ ssr: false })(User);
