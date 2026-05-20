import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export default function SubTitle({
  className,
  ...props
}: ComponentProps<"h2">) {
  return (
    <h1 // NOSONAR
      className={twMerge("text-center text-xl font-bold", className)}
      {...props}
    />
  );
}
