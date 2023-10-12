import { ChangeEvent, useId } from "react";
import { InputProps } from "./types";
import { ShowWhen } from "../..";
import { classNames } from "@/utils";
import { inputCva } from "./cva";
import { useInputValidation } from "@/hooks";

export function Input({
  className = "",
  match,
  label,
  labelClassName = "",
  onChange,
  type,
  required,
  ...props
}: InputProps) {
  const fieldId = useId();
  const { checkValidation, ref, validationError } =
    useInputValidation<HTMLInputElement>({
      match,
      required,
    });

  const labelComponent = (
    <label className={classNames("fw-bold", labelClassName)} htmlFor={fieldId}>
      {label}
    </label>
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    checkValidation(value, onChange);
  };

  return (
    <div className={inputCva({ type })}>
      <div className="d-flex justify-content-between">
        <ShowWhen component={labelComponent} when={label} />
        <span className="text-danger">{validationError}</span>
      </div>

      <input
        id={fieldId}
        ref={ref}
        className={classNames("form-control", className)}
        onChange={handleInputChange}
        required={required}
        onInvalid={(e: ChangeEvent<HTMLInputElement>) => {
          e.preventDefault();
          const { value } = e.target;
          checkValidation(value, onChange);
        }}
        onInput={(e: ChangeEvent<HTMLInputElement>) => {
          e.target.setCustomValidity("");
        }}
        {...props}
      />
    </div>
  );
}
