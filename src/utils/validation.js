import { Regex } from "@/constant";

/**
 * Validates if the given value is a valid 4-digit year.
 * Checks that it is numeric, exactly 4 digits, and falls within
 * the range of 1000 to the current year.
 *
 * @param {string|number} value - The year value to validate
 * @param {string} fieldLabel - The label of the field (default: "Year")
 * @returns {boolean|string} - true if valid, error message string if invalid
 */
export const validateYear = (value, fieldLabel = "Year") => {
  if (!value) return true;
  const strVal = String(value);
  if (!Regex.YEAR_4_DIGIT_REGEX.test(strVal)) {
    return `${fieldLabel} must be exactly 4 digits (e.g., YYYY)`;
  }
  const year = parseInt(value, 10);
  const currentYear = new Date().getFullYear();
  const minYear = currentYear - 150;
  if (year < minYear || year > currentYear) {
    return `${fieldLabel} must be between ${minYear} and ${currentYear}`;
  }
  return true;
};
