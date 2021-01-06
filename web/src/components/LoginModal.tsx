import {
  Box,
  Button,
  Flex,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { InputField } from "./InputField";

interface LoginModalProps {
  text: string;
  useButton?: boolean;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  text,
  useButton = true,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const [, login] = useLoginMutation();
  const signInLink = useColorModeValue("pink.500", "cyan.500");

  return (
    <>
      {useButton ? (
        <Button onClick={onOpen} mr="2">
          {text}
        </Button>
      ) : (
        <Box onClick={onOpen} cursor="pointer" w="100%">
          <Text>{text}</Text>
        </Box>
      )}
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
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
                        Register
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
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
