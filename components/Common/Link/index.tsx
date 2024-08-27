import NextLink from "next/link";
import { LinkProps } from "./types";
import { classNames } from "@/utils";

export function Link({ children, className, ...props }: LinkProps) {
  return (
    <NextLink
      className={classNames("cursor-pointer", className || "")}
      {...props}
    >
      {children}
    </NextLink>
  );
}
