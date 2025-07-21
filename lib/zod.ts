import z from "zod";

// create user schema login and signup
export const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters")
  .max(20, "Password must be no more than 20 characters")
  .refine((val) => /[A-Z]/.test(val), {
    message: "Password must include at least one uppercase letter",
  })
  .refine((val) => /[a-z]/.test(val), {
    message: "Password must include at least one lowercase letter",
  })
  .refine((val) => /[0-9]/.test(val), {
    message: "Password must include at least one number",
  })
  .refine((val) => /[!@#$%^&*]/.test(val), {
    message: "Password must include at least one special character",
  });

export const createUserSchema = z.object({
  name: z.string(),
  username: z
    .string()
    .min(3, "User name must be 3-character")
    .max(10, "User name must be no more than 10 characters"),
  email: z.string().email(),
  password: passwordSchema,
});

export const loginSchema = z.object({
    email : z.string().email(),
    password : z.string()
});
