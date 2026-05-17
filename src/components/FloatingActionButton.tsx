import Link from "next/link";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export default function FloatingActionButton({
  className,
  ...props
}: ComponentProps<typeof Link>) {
  return (
    <Link
      className={twMerge(
        "fixed bottom-6 right-6 bg-blue-500 w-10 h-10 flex items-center justify-center rounded-full shadow-lg hover:bg-blue-600",
        className,
      )}
      {...props}
    />
  );
}
