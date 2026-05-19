import Link from "next/link";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export const ListContainer = ({
  className,
  ...props
}: ComponentProps<"ul">) => (
  <ul
    className={twMerge(
      "flex flex-col gap-4 overflow-y-auto px-5 styled-scrollbar",
      className,
    )}
    {...props}
  />
);

/**
 * List item for linking
 */
export const LinkedListItem = ({
  className,
  ...props
}: ComponentProps<typeof Link>) => (
  <Link
    className={twMerge(
      "block border border-gray-300 rounded-md p-2 hover:bg-gray-100 hover:text-black duration-500 cursor-pointer",
      className,
    )}
    {...props}
  />
);
