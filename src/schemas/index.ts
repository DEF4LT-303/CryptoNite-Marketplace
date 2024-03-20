import { z } from "zod";

export const RegisterSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters long",
  }),

  email: z.string().email({
    message: "Invalid email",
  }),

  password: z
    .string()
    .min(3, {
      message: "Password must be at least 3 characters long",
    })
    .max(50, {
      message: "Password is too long",
    }),

  confirmPassword: z
    .string()
    .min(3, {
      message: "Password must be at least 3 characters long",
    })
    .max(50, {
      message: "Password is too long",
    })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Invalid email",
  }),

  password: z
    .string()
    .min(3, {
      message: "Password must be at least 3 characters long",
    })
    .max(50, {
      message: "Password is too long",
    }),
});