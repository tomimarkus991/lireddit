import { Box, Button, Link, useColorModeValue } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import NextLink from "next/link";
import React from "react";
import { InputField } from "../components/InputField";
import Layout from "../components/Layout";
import { MeDocument, MeQuery, useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { withApollo } from "../utils/withApollo";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [register] = useRegisterMutation();
  const signUpLink = useColorModeValue("pink.500", "cyan.500");
  return (
    <>
      <Layout variant="small">
        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await register({
              variables: { input: values },
              update: (cache, { data }) => {
                cache.writeQuery<MeQuery>({
                  query: MeDocument,
                  data: {
                    __typename: "Query",
                    me: data?.register.user,
                  },
                });
              },
            });
            if (response.data?.register.errors) {
              setErrors(toErrorMap(response.data.register.errors));
            } else if (response.data?.register.user) {
              router.push("/");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                name="username"
                placeholder="Username"
                label="Username"
              />
              <InputField name="email" placeholder="Email" label="Email" />
              <InputField
                name="password"
                placeholder="Password"
                label="Password"
              />
              <Box>
                Already a LiRedditor?&nbsp;
                <NextLink href="/login">
                  <Link ml="auto" textColor={signUpLink}>
                    Log in
                  </Link>
                </NextLink>
              </Box>
              <Button
                variant="outline"
                mt={2}
                type="submit"
                isLoading={isSubmitting}
              >
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </Layout>
    </>
  );
};
export default withApollo({ ssr: false })(Register);
