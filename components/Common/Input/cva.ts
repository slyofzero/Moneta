import { cva } from "class-variance-authority";

export const inputCva = cva("d-flex flex-column gap-2 w-100", {
  variants: {
    type: {
      sm: "input-group-sm",
      md: "input-group-md",
      lg: "input-group-lg",
    },
  },
  defaultVariants: {
    type: "md",
  },
});
