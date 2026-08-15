export const VALIDATION_MESSAGES = {
  AUTH: {
    EMAIL_INVALID: "Invalid email address",
    PASSWORD_REQUIRED: "Password is required",
    PASSWORD_MIN_LENGTH: "Password must be at least 8 characters long",
    PASSWORD_LOWERCASE: "Password must contain at least one lowercase letter",
    PASSWORD_UPPERCASE: "Password must contain at least one uppercase letter",
    PASSWORD_NUMBER: "Password must contain at least one number",
    PASSWORD_SPECIAL: "Password must contain at least one special character",
    PASSWORD_MISMATCH: "Passwords do not match",
  },
  SETTINGS: {
    REFERRAL_EMPLOYEE_AMOUNT_TYPE: "Employee referral amount must be a number",
    REFERRAL_EMPLOYEE_AMOUNT_MIN: "Employee referral amount must be 0 or greater",
    REFERRAL_USER_AMOUNT_TYPE: "User referral amount must be a number",
    REFERRAL_USER_AMOUNT_MIN: "User referral amount must be 0 or greater",
    CURRENT_PASSWORD_REQUIRED: "Current password is required",
    NEW_PASSWORD_MIN: "New password must be at least 8 characters",
    NEW_PASSWORD_UPPERCASE: "Must contain at least one uppercase letter",
    NEW_PASSWORD_NUMBER: "Must contain at least one number",
    CONFIRM_PASSWORD_REQUIRED: "Please confirm your new password",
    PASSWORDS_DONT_MATCH: "Passwords don't match",
  },
  USER_QUERY: {
    SUBJECT_REQUIRED: "Subject is required",
    CONTENT_REQUIRED: "Content is required",
  }
};
