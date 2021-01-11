import { Box, Button, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../../../components/InputField";
import Layout from "../../../components/Layout";
import {
  usePostQuery,
  useUpdatePostMutation,
} from "../../../generated/graphql";
import { useGetIntId } from "../../../utils/useGetIntId";
import { withApollo } from "../../../utils/withApollo";

const UpdatePost: React.FC = () => {
  const router = useRouter();
  const intId = useGetIntId();
  const { data, loading } = usePostQuery({
    skip: intId === -1,
    variables: {
      id: intId,
    },
  });
  const [updatePost] = useUpdatePostMutation();
  if (loading) {
    return (
      <Layout>
        <Box>
          <Text>Loading...</Text>
        </Box>
      </Layout>
    );
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
      <Formik
        initialValues={{ title: data.post.title, text: data.post.text }}
        onSubmit={async (values) => {
          await updatePost({ variables: { id: intId, ...values } });
          router.back();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="title" placeholder="Title" label="Title" />
            <InputField
              name="text"
              placeholder="Type your post"
              label="Text"
              textarea
            />
            <Button
              variant="outline"
              mt={2}
              type="submit"
              isLoading={isSubmitting}
            >
              Update Post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};
export default withApollo({ ssr: false })(UpdatePost);
