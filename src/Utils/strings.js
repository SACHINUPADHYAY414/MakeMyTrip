// General Messages
export const OPPS_MSG = "Oops!";
export const SUCCESS_MSG = "Success!";

// Error Messages
export const REQUIRED_FIELDS = "Please fill all required fields.";
export const ERROR_REQUIRED = (label) =>
  `${label ?? "This field"} is required.`;

export const ERROR_VALIDATE_EMAIL = "Email validation error.";
export const ERROR_LEADING_OR_TRAILING_SPACE =
  "Don't start or end with a space or special character.";
export const ERROR_DOUBLE_SPACE = "Only one space between words.";
export const ERROR_MAXIMUM_LENGTH = (length) =>
  `Max length: ${length} characters.`;

export const ERROR_MINIMUM_LENGTH = (length) =>
  `Min length: ${length} characters.`;

export const ERROR_MUST_LENGTH = (length) =>
  `Length must be: ${length} characters.`;

// Password related messages
export const PASSWORD_STRENGTH =
  "Password must contain at least 8 characters including one uppercase letter, one lowercase letter, one number, and one special character (such as @$!%*?&).";
export const PASSWORD_NOT_METCH = "Passwords do not match.";

// Date related messages
export const DOB_RANGE_MESSAGE =
  "Date of birth should be between January 1, 1930, and today's date. Please enter a valid date.";
export const OPPS_ERROR =
  "There was an issue while processing your request. Please try again later.";
export const SERVER_ERROR = "Failed to reach server. Please try again later.";
export const TRUE = "TRUE";
export const FALSE = "FALSE";

export const SESSION_EXPIRE = "Your session has been expire";
export const ERROR_PASTE_DATA = "Pasted data is invalid.";
