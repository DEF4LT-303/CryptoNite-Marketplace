import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(3, {
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

export const ProfileSchema = z.object({
  name: z.optional(z.string().min(3, {
    message: "Username must be at least 3 characters long",
  })),

  email: z.optional(z.string().email({
    message: "Invalid email",
  })),

  password: z.optional(z.string().min(6).max(50)),
  newPassword: z.optional(z.string().min(6).max(50)),
}).refine((data) => {
  if (data.password && !data.newPassword) {
    return false;
  }

  return true;
},
  {
    message: "New password is reuired!",
    path: ["newPassword"],
  }
).refine((data) => {
  if (data.newPassword && !data.password) {
    return false;
  }

  return true;
},
  {
    message: "Password is reuired!",
    path: ["password"],
  }
);