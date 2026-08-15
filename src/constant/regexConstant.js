export const Regex = {
    // 4-digit year format check
    YEAR_4_DIGIT_REGEX: /^\d{4}$/,

    // ISO date format YYYY-MM-DD check
    ISO_DATE_STRING_REGEX: /^\d{4}-\d{2}-\d{2}$/,

    // Dashed date format DD-MM-YYYY check
    DASHED_DATE_STRING_REGEX: /^\d{1,2}-\d{1,2}-\d{4}$/,

    // Date parsing capture groups
    DD_MM_YYYY_CAPTURE_REGEX: /^(\d{1,2})-(\d{1,2})-(\d{4})$/,
    YYYY_MM_DD_CAPTURE_REGEX: /^(\d{4})-(\d{1,2})-(\d{1,2})$/,

    // Numeric check pattern
    NUMERIC_STRING_REGEX: /^\d+$/,

    // Password composition rules
    PASSWORD_LOWERCASE_REGEX: /^(?=.*[a-z])/,
    PASSWORD_UPPERCASE_REGEX: /^(?=.*[A-Z])/,
    PASSWORD_DIGIT_REGEX: /^(?=.*\d)/,
    PASSWORD_SPECIAL_CHAR_REGEX: /^(?=.*[@$!%*?&])/,

    // Non-alphanumeric check (for strength check)
    PASSWORD_NON_ALPHANUMERIC_REGEX: /[^A-Za-z0-9]/,
    PASSWORD_UPPERCASE_CHAR_REGEX: /[A-Z]/,
    PASSWORD_DIGIT_CHAR_REGEX: /[0-9]/,

    // General email check (simple)
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

    // Content-Disposition header filename extraction pattern
    CONTENT_DISPOSITION_FILENAME_REGEX: /filename[^;=\n]*=(['"])?(.*?)\1/,

    // Px unit capture pattern
    PX_UNIT_CAPTURE_REGEX: /^(\d+)px$/,
};
