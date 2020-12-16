import { Box, Button, Link, useColorModeValue } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/dist/client/router";
import NextLink from "next/link";
import React from "react";
import { InputField } from "../components/InputField";
import Layout from "../components/Layout";
import { Wrapper } from "../components/Wrapper";
import { useRegisterMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { toErrorMap } from "../utils/toErrorMap";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  const signUpLink = useColorModeValue("pink.500", "cyan.500");
  return (
    <>
      {/* <NavBar /> */}
      <Layout variant="small">
        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await register({ options: values });
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
export default withUrqlClient(createUrqlClient)(Register);
