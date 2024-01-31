import { z } from "zod";

const phoneRegex = /^03[0-4]\d{8}$/;
const cnicRegex = /^\d{5}-\d{7}-\d$/;

export const userLoginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export const userRegisterSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    name: z.string().min(1, "Name is required"),
    dob: z.string().refine((dob) => {
      const dobDate = new Date(dob);
      const yearsAgo = new Date();
      yearsAgo.setFullYear(yearsAgo.getFullYear() - 18);
      return dobDate <= yearsAgo;
    }, "Must be at least 18 years old"),
    password: z.string().min(1, "Password is required"),
    confirm_password: z.string().min(1, "Password is required"),
    gender: z.string().min(1, "Gender is required"),
    phone_no: z.string().refine((value) => phoneRegex.test(value), {
      message: "Invalid phone number",
    }),
    cell_no: z.string().refine((value) => phoneRegex.test(value), {
      message: "Invalid phone number",
    }),
    research_domain: z.string().min(1, "Research Domain is required"),
    highest_degree: z.string().min(1, "Highest Degree is required"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export const userVerifyEmailSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  cnic: z.string().refine((value) => cnicRegex.test(value), {
    message: "Format: 00000-0000000-0",
  }),
});

export const userUpdatePasswordSchema = z
  .object({
    password: z.string().min(1, "Password is required"),
    confirm_password: z.string().min(1, "Password is required"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });
