import { MatchFuncType } from "./types";

export * from "./types";

// ------------------------------ To check if the name is valid ------------------------------
export const isValidName: MatchFuncType = (name) => {
  const namePattern = /^[A-Za-z\s]+$/;
  const isNameValid = namePattern.test(name);

  if (!isNameValid) {
    return "Please enter a valid name.";
  }

  return true;
};

// ------------------------------ To check if the number is valid ------------------------------
export const isValidNumber: MatchFuncType = (number) => {
  const numberPattern = /^[0-9]+$/; // This pattern matches only digits (0-9)
  const isNumberValid = numberPattern.test(number);

  if (!isNumberValid) {
    return "Please enter a valid number.";
  }

  return true;
};
