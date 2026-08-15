import { z } from "zod";
import { Regex, VALIDATION_MESSAGES } from "@/constant";

export const loginSchema = z.object({
  email: z.string().email(VALIDATION_MESSAGES.AUTH.EMAIL_INVALID),
  password: z.string().min(1, VALIDATION_MESSAGES.AUTH.PASSWORD_REQUIRED),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email(VALIDATION_MESSAGES.AUTH.EMAIL_INVALID),
});

// Password validation schema
export const passwordSchema = z
    .object({
        password: z
            .string()
            .min(8, VALIDATION_MESSAGES.AUTH.PASSWORD_MIN_LENGTH)
            .refine((password) => Regex.PASSWORD_LOWERCASE_REGEX.test(password), {
                message: VALIDATION_MESSAGES.AUTH.PASSWORD_LOWERCASE,
            })
            .refine((password) => Regex.PASSWORD_UPPERCASE_REGEX.test(password), {
                message: VALIDATION_MESSAGES.AUTH.PASSWORD_UPPERCASE,
            })
            .refine((password) => Regex.PASSWORD_DIGIT_REGEX.test(password), {
                message: VALIDATION_MESSAGES.AUTH.PASSWORD_NUMBER,
            })
            .refine((password) => Regex.PASSWORD_SPECIAL_CHAR_REGEX.test(password), {
                message: VALIDATION_MESSAGES.AUTH.PASSWORD_SPECIAL,
            }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: VALIDATION_MESSAGES.AUTH.PASSWORD_MISMATCH,
        path: ["confirmPassword"],
    });
