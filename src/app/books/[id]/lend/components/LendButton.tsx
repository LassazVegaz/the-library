"use client";
import { Button } from "@/components/FormComponents";
import { ComponentProps, useState } from "react";
import { lendAction } from "../actions";
import { handleServerError } from "@/lib/client/error-handlers";
import { useRouter } from "next/navigation";

type LendButtonProps = ComponentProps<typeof Button> & {
  userId: number | null;
  bookId: number;
};

export default function LendButton({
  disabled,
  userId,
  bookId,
  ...props
}: LendButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onClick = async () => {
    if (userId === null) return;

    setIsLoading(true);
    try {
      await lendAction({ userId, bookId });
      alert("Book was successfully lent");
      router.push("/book");
    } catch (err) {
      handleServerError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={onClick} disabled={disabled || isLoading} {...props} />
  );
}
