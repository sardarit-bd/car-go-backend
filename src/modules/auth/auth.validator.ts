import * as yup from "yup";

export const registerSchema = yup.object({
  firstName: yup.string().trim().required("First name is required"),
  lastName: yup.string().trim().required("Last name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});

export const resetPasswordSchema = yup.object({
  token: yup.string().required("Reset token is required"),
  newPassword: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required"),
});

export const updateProfileSchema = yup
  .object({
    firstName: yup.string().trim().optional(),
    lastName: yup.string().trim().optional(),
    email: yup.string().email("Invalid email format").optional(),
    phone: yup.string().trim().optional(),
    currentPassword: yup.string().optional(),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .optional(),
    confirmPassword: yup.string().optional(),
  })
  .test("password-match", "Passwords must match", function (value) {
    if (value.password) {
      return value.password === value.confirmPassword;
    }
    return true;
  })
  .test(
    "current-password-required",
    "Current password is required to change password",
    function (value) {
      if (value.password) {
        return !!value.currentPassword;
      }
      return true;
    },
  );

export const activateAccountSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  token: yup.string().required("Activation token is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
