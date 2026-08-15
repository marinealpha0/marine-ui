/**
 * Compares current form values with initial values to determine changed fields.
 * Returns an object containing only the changed fields, or null if no changes were detected.
 *
 * @param {Object} allValues - The current form values
 * @param {Object} initialValues - The initial form values
 * @returns {Object|null} - Object with changed fields or null
 */
export const getDirtyValues = (allValues, initialValues) => {
  const dirtyValues = {};
  let hasChanges = false;

  Object.keys(allValues).forEach((key) => {
    const currentValue = allValues[key];
    const initialValue = initialValues[key];

    // Handle deep comparison for objects and arrays
    if (
      typeof currentValue === "object" &&
      currentValue !== null &&
      typeof initialValue === "object" &&
      initialValue !== null
    ) {
      if (JSON.stringify(currentValue) !== JSON.stringify(initialValue)) {
        dirtyValues[key] = currentValue;
        hasChanges = true;
      }
    } else if (currentValue !== initialValue) {
      dirtyValues[key] = currentValue;
      hasChanges = true;
    }
  });

  return hasChanges ? dirtyValues : null;
};

/**
 * Truncates text to a specified length
 *
 * @param {string} text - The text to truncate
 * @param {number} maxLength - Maximum length before truncation (default: 75)
 * @returns {string} - Truncated text with ellipsis if needed
 */
export const truncateText = (text, maxLength = 75) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

/**
 * Dynamically updates the options list of specified fields in a fields definition array.
 * Highly useful for populating dropdowns (categories, coupons, courses, etc.) dynamically.
 *
 * @param {Array} fields - The form or filter field definitions array
 * @param {Object} optionsMap - Map of field names to their options array (e.g., { categoryId: categoryOptions })
 * @returns {Array} - A new field definitions array with injected options
 */
export const injectFieldsOptions = (fields, optionsMap = {}, configMap = {}) => {
  if (!fields || !Array.isArray(fields)) return [];
  return fields.map((field) => {
    let updatedField = { ...field };
    if (optionsMap && field.name in optionsMap) {
      updatedField.options = optionsMap[field.name] || [];
    }
    if (configMap && field.name in configMap) {
      const config = configMap[field.name];
      if (config) {
        if (config.loading !== undefined) {
          updatedField.loading = config.loading;
        }
        if (config.disabled !== undefined) {
          updatedField.disabled = config.disabled;
        }
        if (config.refetch) {
          updatedField.onOpenChange = (open) => {
            const options = optionsMap[field.name];
            const hasRun = config.isSuccess || config.isError || config.hasRun;
            if (open && !hasRun && (!options || options.length === 0)) {
              config.refetch();
            }
            if (config.onOpenChange) {
              config.onOpenChange(open);
            }
          };
        } else if (config.onOpenChange) {
          updatedField.onOpenChange = config.onOpenChange;
        }
      }
    }
    return updatedField;
  });
};
