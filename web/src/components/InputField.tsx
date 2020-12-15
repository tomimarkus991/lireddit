import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Textarea,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

type InputFieldProps = {
  name: string;
  label: string;
  placeholder: string;
  textarea?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({ ...props }) => {
  const { label, placeholder, textarea, name } = props;
  const [show, setShow] = useState(false);
  let InputOrTextarea = Input;
  if (textarea) {
    InputOrTextarea = Textarea;
  }
  const [field, { error }] = useField(props);
  return (
    <FormControl mb={2} isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      {name === "password" ? (
        <InputGroup isAttached>
          <Input
            {...field}
            {...props}
            id={field.name}
            placeholder={placeholder}
            variant="outline"
            type={show ? "text" : "password"}
          />
          <InputRightElement width="3rem">
            {show ? (
              <IconButton
                onClick={() => setShow(!show)}
                icon={<AiFillEyeInvisible />}
                aria-label="show"
                height="1.5rem"
                size="sm"
              />
            ) : (
              <IconButton
                onClick={() => setShow(!show)}
                icon={<AiFillEye />}
                aria-label="hide"
                height="1.5rem"
                size="sm"
              />
            )}
          </InputRightElement>
        </InputGroup>
      ) : (
        <InputOrTextarea
          {...field}
          {...props}
          id={field.name}
          placeholder={placeholder}
          variant="outline"
        />
      )}

      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
