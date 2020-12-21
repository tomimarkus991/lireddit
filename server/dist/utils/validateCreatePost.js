"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreatePost = void 0;
const validateCreatePost = (input) => {
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
exports.validateCreatePost = validateCreatePost;
//# sourceMappingURL=validateCreatePost.js.map