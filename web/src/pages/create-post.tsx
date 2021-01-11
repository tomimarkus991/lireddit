import { Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import Layout from "../components/Layout";
import { useCreatePostMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useIsAuth } from "../utils/useIsAuth";
import { withApollo } from "../utils/withApollo";

const CreatePost: React.FC = ({}) => {
  const router = useRouter();
  useIsAuth();
  const [createPost] = useCreatePostMutation();
  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: "", text: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await createPost({
            variables: { input: values },
            update: (cache) => {
              cache.evict({ fieldName: "posts" });
            },
          });
          if (response.data?.createPost.errors) {
            setErrors(toErrorMap(response.data?.createPost.errors));
          } else if (!response.data?.createPost.errors) {
            router.push("/");
          }
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
              Post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};
export default withApollo({ ssr: false })(CreatePost);
