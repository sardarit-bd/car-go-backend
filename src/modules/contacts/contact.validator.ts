import * as yup from "yup";

export const createContactSchema = yup.object({
  name: yup.string().required("Name is required").min(2, "Name must be at least 2 characters"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  message: yup.string().required("Message is required").min(10, "Message must be at least 10 characters"),
  // Optional: Frontend will send this token if you implement Google reCAPTCHA
  captchaToken: yup.string().optional(), 
});

export const updateContactStatusSchema = yup.object({
  status: yup.string().oneOf(["PENDING", "IN_PROGRESS", "SOLVED", "CLOSED"], "Invalid status").required("Status is required"),
});