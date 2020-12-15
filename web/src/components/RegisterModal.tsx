import {
  Box,
  Button,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useRouter } from "next/dist/client/router";
import NextLink from "next/link";
import React from "react";
import { InputField } from "../components/InputField";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { LoginModal } from "./LoginModal";
interface RegisterModalProps {
  text: string;
}
export const RegisterModal: React.FC<RegisterModalProps> = ({ text }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const [, register] = useRegisterMutation();
  const signUpLink = useColorModeValue("pink.500", "cyan.500");
  return (
    <>
      <Button onClick={onOpen} mr="3">
        {text}
      </Button>

      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign up</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
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
                    {/* <Button onClick={onClose}> */}
                    <LoginModal text="Log in" />
                    {/* </Button> */}
                    {/* <NextLink href="/login">
                      <Link ml="auto" textColor={signUpLink}>
                        Log in
                      </Link>
                    </NextLink> */}
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
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};