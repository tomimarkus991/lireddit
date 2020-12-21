import { PostInput } from "../resolvers/PostInput";

export const validateCreatePost = (input: PostInput) => {
  if (input.title.length <= 0) {
    return [
      {
        field: "title",
        message: "You must have a title",
      },
    ];
  }

  if (input.title.length >= 300) {
    return [
      {
        field: "title",
        message: "Title cannot be bigger than 300 chars",
      },
    ];
  }

  return null;
};
