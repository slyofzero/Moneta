import NextLink from "next/link";
import { LinkProps } from "./types";

export function Link({ children, ...props }: LinkProps) {
  return <NextLink {...props}>{children}</NextLink>;
}
