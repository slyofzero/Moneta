import { useRef, useState } from "react";
import {
  ValidatableElement,
  onChangeType,
  useInputValidationProps,
} from "./types";

export function useInputValidation<T extends ValidatableElement>({
  required,
  match,
}: useInputValidationProps) {
  const [validationError, setValidationError] = useState("");
  const ref = useRef<T>(null);

  const checkValidation = (value: any, onChange?: onChangeType) => {
    const name = ref.current?.name;

    if (name) {
      const validate = (
        matchedValue: string | boolean,
        onChange: onChangeType
      ) => {
        if (typeof matchedValue === "string") {
          setValidationError(matchedValue);
          onChange(name, "");
          ref.current?.setCustomValidity("not valid");
        } else {
          onChange(name, value);
          setValidationError("");
        }
      };

      if (!value && required) {
        setValidationError("Please enter a value");
      } else if (match && onChange) {
        const valueMatches = match(value);

        if (valueMatches instanceof Promise) {
          valueMatches.then((response) => validate(response, onChange));
        } else {
          validate(valueMatches, onChange);
        }
      } else if (onChange) {
        onChange(name, value);
        setValidationError("");
      }
    }
  };

  return { validationError, checkValidation, ref };
}
