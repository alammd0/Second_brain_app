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
  email: z.string().email(),
  password: z.string(),
});

export const createContentSchema = z.object({
  title: z.string(),
  description: z.string(),
  url: z.string(),
  tags: z.array(z.string()),
  contentType: z.enum(["Document", "Twitter", "Youtube", "Instagram"]),
});

export const updateContentSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  url: z.string().optional(),
  contentType: z.enum(["Document", "Twitter", "Youtube", "Instagram"]).optional(),
});
