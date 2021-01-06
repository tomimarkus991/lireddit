import { Box, Button, Flex, Link, useColorModeValue } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import Layout from "../components/Layout";
import { useLoginMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { toErrorMap } from "../utils/toErrorMap";

const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  const signInLink = useColorModeValue("pink.500", "cyan.500");
  return (
    <Layout variant="small">
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login(values);
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data?.login.errors));
          } else if (response.data?.login.user) {
            if (typeof router.query.next === "string") {
              router.push(router.query.next);
            } else {
              router.push("/");
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="usernameOrEmail"
              placeholder="username or email"
              label="Username or Email"
            />
            <InputField
              name="password"
              label="Password"
              placeholder="Enter password"
            />

            <Box>
              New to LiReddit&nbsp;
              {/* <Button onClick={onClose}> */}
              {/* <RegisterModal text="Sign up" /> */}
              {/* </Button> */}
              <NextLink href="/register">
                <Link ml="auto" textColor={signInLink}>
                  Sign up
                </Link>
              </NextLink>
            </Box>
            <Flex>
              <NextLink href="/forgot-password">
                <Link ml="auto" textColor={signInLink}>
                  Forgot Password?
                </Link>
              </NextLink>
            </Flex>
            <Button
              variant="outline"
              mt={2}
              type="submit"
              isLoading={isSubmitting}
              colorScheme="blue"
              mr={3}
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};
export default withUrqlClient(createUrqlClient)(Login);
