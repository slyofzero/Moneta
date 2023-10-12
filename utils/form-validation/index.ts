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
