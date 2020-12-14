import React from "react";
import { Form, Formik } from "formik";
import { Box, Button, Flex, Link, useColorModeValue } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import ColorMode from "../components/ColorMode";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/dist/client/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from "next/link";

const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  const signInLink = useColorModeValue("pink.500", "cyan.500");
  return (
    <Wrapper variant="small">
      <ColorMode />
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
              placeholder="Password"
              label="Password"
              type="password"
            />
            <Box>
              New to LiReddit&nbsp;
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
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(Login);
