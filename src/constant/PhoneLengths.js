/**
 * National phone number lengths keyed by ISO 3166-1 alpha-2 country code.
 * Values represent the expected digit count for the subscriber number
 * (excluding the country / area code prefix).
 *
 * Used by PhoneField.jsx (UX: maxLength / placeholder) and
 * FormDialog.jsx (validation via isValidPhoneNumber from react-phone-number-input).
 *
 * Extend as needed.
 */
export const PHONE_LENGTHS = {
  // South Asia
  IN: 10, // India
  PK: 10, // Pakistan
  BD: 10, // Bangladesh
  LK: 9,  // Sri Lanka
  NP: 10, // Nepal
  BT: 8,  // Bhutan
  MV: 7,  // Maldives

  // East Asia
  CN: 11, // China
  JP: 10, // Japan
  KR: 10, // South Korea
  TW: 9,  // Taiwan

  // South-East Asia
  SG: 8,  // Singapore
  MY: 9,  // Malaysia
  TH: 9,  // Thailand
  ID: 10, // Indonesia
  PH: 10, // Philippines
  VN: 10, // Vietnam
  MM: 9,  // Myanmar
  KH: 9,  // Cambodia
  LA: 8,  // Laos
  BN: 7,  // Brunei

  // Middle East
  AE: 9,  // UAE
  SA: 9,  // Saudi Arabia
  QA: 8,  // Qatar
  KW: 8,  // Kuwait
  BH: 8,  // Bahrain
  OM: 8,  // Oman
  JO: 9,  // Jordan
  LB: 8,  // Lebanon
  IQ: 10, // Iraq
  IR: 10, // Iran
  IL: 9,  // Israel

  // Africa
  ZA: 9,  // South Africa
  NG: 10, // Nigeria
  KE: 9,  // Kenya
  EG: 10, // Egypt
  GH: 9,  // Ghana
  ET: 9,  // Ethiopia
  TZ: 9,  // Tanzania
  UG: 9,  // Uganda

  // Europe
  GB: 10, // United Kingdom
  DE: 10, // Germany
  FR: 9,  // France
  IT: 10, // Italy
  ES: 9,  // Spain
  NL: 9,  // Netherlands
  BE: 9,  // Belgium
  CH: 9,  // Switzerland
  AT: 10, // Austria
  SE: 9,  // Sweden
  NO: 8,  // Norway
  DK: 8,  // Denmark
  FI: 9,  // Finland
  PL: 9,  // Poland
  RU: 10, // Russia
  UA: 9,  // Ukraine
  TR: 10, // Turkey
  GR: 10, // Greece
  PT: 9,  // Portugal
  RO: 9,  // Romania
  HU: 9,  // Hungary
  CZ: 9,  // Czech Republic
  SK: 9,  // Slovakia

  // Americas
  US: 10, // United States
  CA: 10, // Canada
  MX: 10, // Mexico
  BR: 11, // Brazil
  AR: 10, // Argentina
  CO: 10, // Colombia
  PE: 9,  // Peru
  CL: 9,  // Chile
  VE: 10, // Venezuela

  // Oceania
  AU: 9,  // Australia
  NZ: 9,  // New Zealand
};

/** Returns the expected national-number digit count for a given country code */
export const getPhoneLength = (countryCode) =>
  PHONE_LENGTHS[countryCode] ?? 10; // default to 10 if unknown
