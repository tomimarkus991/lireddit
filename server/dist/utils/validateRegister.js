"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegister = void 0;
const validateRegister = (input) => {
    if (input.username.length <= 2) {
        return [
            {
                field: "username",
                message: "Username length has to be greater than 2",
            },
        ];
    }
    if (input.username.includes("@")) {
        return [
            {
                field: "username",
                message: "Cannot include an @ sign",
            },
        ];
    }
    if (!input.email.includes("@")) {
        return [
            {
                field: "email",
                message: "Invalid email",
            },
        ];
    }
    if (input.password.length <= 6) {
        return [
            {
                field: "password",
                message: "Password length has to be greater than 6",
            },
        ];
    }
    return null;
};
exports.validateRegister = validateRegister;
//# sourceMappingURL=validateRegister.js.map