import { UsernameAndPasswordInput } from "../resolvers/UsernameAndPasswordInput";

export const validateRegister = (options: UsernameAndPasswordInput) => {
  if (options.username.length <= 2) {
    return [
      {
        field: "username",
        message: "Username length has to be greater than 2",
      },
    ];
  }

  if (options.username.includes("@")) {
    return [
      {
        field: "username",
        message: "Cannot include an @ sign",
      },
    ];
  }

  if (!options.email.includes("@")) {
    return [
      {
        field: "email",
        message: "Invalid email",
      },
    ];
  }

  if (options.password.length <= 6) {
    return [
      {
        field: "password",
        message: "Password length has to be greater than 6",
      },
    ];
  }

  return null;
};
