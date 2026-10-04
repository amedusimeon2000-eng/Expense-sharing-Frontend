import { z } from 'zod';

/** Mirrors the backend's register/login validators so most errors never round-trip. */
export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, 'Enter your name.')
      .min(2, 'Name must be at least 2 characters.')
      .max(50, 'Name must be 50 characters or fewer.'),
    email: z.string().trim().toLowerCase().email('Enter a valid email address.'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters.')
      .max(128, 'Password must be 128 characters or fewer.'),
    confirm: z.string(),
  })
  .refine((data) => data.confirm && data.confirm === data.password, {
    message: "Passwords don't match.",
    path: ['confirm'],
  });

export const loginSchema = z.object({
  email: z.string().trim().min(1, 'Enter your email and password.'),
  password: z.string().min(1, 'Enter your email and password.'),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Enter your current password.'),
    newPassword: z.string().min(8, 'New password must be at least 8 characters.'),
    confirm: z.string(),
  })
  .refine((data) => data.confirm === data.newPassword, {
    message: "Passwords don't match.",
    path: ['confirm'],
  });
