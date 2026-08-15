import * as z from "zod";
import { Regex, VALIDATION_MESSAGES } from "@/constant";

// Schema for the Referrals tab in Settings
export const referralSchema = z.object({
  employeeAmount: z
    .coerce.number({ invalid_type_error: VALIDATION_MESSAGES.SETTINGS.REFERRAL_EMPLOYEE_AMOUNT_TYPE })
    .min(0, VALIDATION_MESSAGES.SETTINGS.REFERRAL_EMPLOYEE_AMOUNT_MIN),
  employeeIsActive: z.boolean(),
  employeeRoles: z.array(z.string()).optional(),
  userAmount: z
    .coerce.number({ invalid_type_error: VALIDATION_MESSAGES.SETTINGS.REFERRAL_USER_AMOUNT_TYPE })
    .min(0, VALIDATION_MESSAGES.SETTINGS.REFERRAL_USER_AMOUNT_MIN),
  userIsActive: z.boolean(),
});

// Schema for the Change Password form in the Account tab
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, VALIDATION_MESSAGES.SETTINGS.CURRENT_PASSWORD_REQUIRED),
    newPassword: z
      .string()
      .min(8, VALIDATION_MESSAGES.SETTINGS.NEW_PASSWORD_MIN)
      .regex(Regex.PASSWORD_UPPERCASE_CHAR_REGEX, VALIDATION_MESSAGES.SETTINGS.NEW_PASSWORD_UPPERCASE)
      .regex(Regex.PASSWORD_DIGIT_CHAR_REGEX, VALIDATION_MESSAGES.SETTINGS.NEW_PASSWORD_NUMBER),
    confirmPassword: z.string().min(1, VALIDATION_MESSAGES.SETTINGS.CONFIRM_PASSWORD_REQUIRED),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: VALIDATION_MESSAGES.SETTINGS.PASSWORDS_DONT_MATCH,
    path: ["confirmPassword"],
  });

