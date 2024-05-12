import { z } from "zod";

// User schema
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

  password: z.optional(z.string().min(6).max(50)).or(z.literal('')),
  newPassword: z.optional(z.string().min(6).max(50)).or(z.literal('')),
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
).refine((data) => {
  if (data.password && data.newPassword && data.password === data.newPassword) {
    return false;
  }

  return true;
},
  {
    message: "Passwords must be different!",
    path: ["newPassword"],
  }
);

// Product schema
// const MAX_FILE_SIZE = 5000000;
// const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const ProductSchema = z.object({
  name: z.string().min(3, {
    message: "Product name must be at least 3 characters long",
  }),

  description: z.string().min(3, {
    message: "Product description must be at least 3 characters long",
  }),

  price: z.coerce.number().gte(0.01, {
    message: "Price must be at least $0.01",
  }),

  stock: z.number().min(1, {
    message: "Stock must be at least 1",
  }),

  // image: z
  //   .any()
  //   .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
  //   .refine(
  //     (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
  //     "Only .jpg, .jpeg, .png and .webp formats are supported."
  //   ),
});