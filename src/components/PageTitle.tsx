import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export default function PageTitle({
  className,
  ...props
}: ComponentProps<"h1">) {
  return (
    <h1 // NOSONAR
      className={twMerge("text-center text-2xl font-bold", className)}
      {...props}
    />
  );
}
