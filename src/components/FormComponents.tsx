import Link from "next/link";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type ButtonVariants = "red" | "gray" | "blue";

export const FieldsContainer = ({
  className,
  ...props
}: ComponentProps<"div">) => (
  <div className={twMerge("flex items-center", className)} {...props} />
);

export const Label = ({ className, ...props }: ComponentProps<"label">) => (
  <label className={twMerge("w-37.5", className)} {...props} /> // NOSONAR
);

export const InputField = ({
  className,
  ...props
}: ComponentProps<"input">) => (
  <input
    className={twMerge("border p-2 rounded read-only:opacity-50", className)}
    {...props}
  />
);

type ButtonProps = ComponentProps<"button"> & {
  variant?: ButtonVariants;
};

export const Button = ({ className, variant, ...props }: ButtonProps) => (
  <button
    className={twMerge(
      "border px-4 py-2 rounded cursor-pointer duration-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent",
      variant === "red" && "border-red-500 hover:bg-red-500",
      variant === "gray" && "border-gray-500 hover:bg-gray-500",
      variant === "blue" && "border-blue-500 hover:bg-blue-500",
      className,
    )}
    {...props}
  />
);

type LinkButtonProps = ComponentProps<typeof Link> & {
  variant?: ButtonVariants;
  disabled?: boolean;
};

export const LinkButton = ({
  className,
  variant,
  disabled,
  ...props
}: LinkButtonProps) => (
  <Link
    className={twMerge(
      "border px-4 py-2 rounded duration-300",
      variant === "red" && "border-red-500 hover:bg-red-500",
      variant === "gray" && "border-gray-500 hover:bg-gray-500",
      variant === "blue" && "border-blue-500 hover:bg-blue-500",
      disabled && "cursor-not-allowed opacity-50 hover:bg-transparent",
      className,
    )}
    {...props}
  />
);
