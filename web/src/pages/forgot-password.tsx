import { Box, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import ColorMode from "../components/ColorMode";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useForgotPasswordMutation } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";

const forgotPassword: React.FC<{}> = ({}) => {
  const [complete, setComplete] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation();
  return (
    <Wrapper variant="small">
      <ColorMode buttonSize="md" mLeft="2" />
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values) => {
          await forgotPassword({ variables: values });
          setComplete(true);
        }}
      >
        {({ isSubmitting }) =>
          complete ? (
            <Box>
              If an account with that email exists, we sent you an email
            </Box>
          ) : (
            <Form>
              <InputField name="email" placeholder="Email" label="Email" />
              <Button
                variant="outline"
                mt={2}
                type="submit"
                isLoading={isSubmitting}
              >
                Send change password link
              </Button>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
};
export default withApollo({ ssr: false })(forgotPassword);
