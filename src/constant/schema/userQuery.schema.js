import { z } from "zod";
import { VALIDATION_MESSAGES } from "@/constant";

export const replySchema = z.object({
  from: z.string().email(VALIDATION_MESSAGES.AUTH.EMAIL_INVALID),
  to: z.string().email(VALIDATION_MESSAGES.AUTH.EMAIL_INVALID),
  subject: z.string().min(1, VALIDATION_MESSAGES.USER_QUERY.SUBJECT_REQUIRED),
  content: z.string().min(1, VALIDATION_MESSAGES.USER_QUERY.CONTENT_REQUIRED),
  attachment: z.any().optional(),
});
