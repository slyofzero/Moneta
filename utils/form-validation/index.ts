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

// ------------------------------ To check if the address is valid ------------------------------
export const isValidEthAddress: MatchFuncType = (address) => {
  const ethAddressPattern = /^0x[a-fA-F0-9]{40}$/;
  const isAddressValid = ethAddressPattern.test(address);

  if (!isAddressValid) {
    return "Please enter a valid Ethereum address.";
  }

  return true;
};

// ------------------------------ To check if a URL is valid ------------------------------
export const isValidWebsite: MatchFuncType = (url) => {
  const websitePattern =
    /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
  const isUrlValid = websitePattern.test(url);

  if (!isUrlValid) {
    return "Please enter a valid website URL.";
  }

  return true;
};
