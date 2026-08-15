// Utility function to format package
export const formatPackage = (value) => {
  if (typeof value === 'string' && value.includes('-')) {
    const parts = value.split('-');
    const min = Number(parts[0]);
    const max = Number(parts[1]);

    if (!isNaN(min) && !isNaN(max)) {
      return `${formatSingleValue(min)} - ${formatSingleValue(max)}`;
    }
    return value;
  }
  
  const num = Number(value);
  if (!isNaN(num) && String(value).trim() !== "") {
    return formatSingleValue(num);
  }
  
  return value;
};

const formatSingleValue = (value) => {
  if (value >= 100_000) {
    // 100,000 for LPA
    const lakhs = value / 100_000; // Convert to LPA
    // Check if the value is a whole number
    return `${Number.isInteger(lakhs) ? lakhs : lakhs.toFixed(1)}LPA`;
  } else if (value >= 1_000) {
    const thousands = value / 1_000;
    // Check if the value is a whole number
    return `${Number.isInteger(thousands) ? thousands : thousands.toFixed(1)}K`;
  }
  return value.toString();
};
