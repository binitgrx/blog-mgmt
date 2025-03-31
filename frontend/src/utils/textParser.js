export const getInitials = (fullName) => {
  if (!fullName || typeof fullName !== "string") {
    return ""; // Return an empty string for invalid input
  }
  const words = fullName
    .trim() // Remove extra spaces at the start and end
    .split(/\s+/); // Split by one or more spaces
  if (words.length === 0) {
    return ""; // If no valid name found, return empty string
  }
  return words
    .map((word) => word[0].toUpperCase()) // Get the first letter and uppercase it
    .join(""); // Join initials
};
