import React from "react";
import { Form, Formik } from "formik";
import { Box, Button, Link, useColorModeValue } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import ColorMode from "../components/ColorMode";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/dist/client/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from "next/link";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  const signUpLink = useColorModeValue("pink.500", "cyan.500");
  return (
    <Wrapper variant="small">
      <ColorMode />
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
              type="password"
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
    </Wrapper>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: true })(Register);
