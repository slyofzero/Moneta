import { MatchFuncType } from "@/utils";
import { inputCva } from "./cva";
import { VariantProps } from "class-variance-authority";

/* eslint-disable */
interface OmittedProps {
  onChange: never;
  type: never;
}
type HTMLInputElementProps = React.InputHTMLAttributes<HTMLInputElement>;
type HTMLInputElementOmittedProps = Omit<
  HTMLInputElementProps,
  keyof OmittedProps
>;
export type InputVariantProps = VariantProps<typeof inputCva>;

export interface InputProps
  extends HTMLInputElementOmittedProps,
    InputVariantProps {
  onChange: (name: string, value: string) => void;
  label?: string;
  labelClassName?: string;
  match?: MatchFuncType;
}
