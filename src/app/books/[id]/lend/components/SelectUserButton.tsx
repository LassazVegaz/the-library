"use client";
import { Button } from "@/components/FormComponents";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

type SelectUserButtonProps = {
  dialogId: string;
};

export default function SelectUserButton(
  props: Readonly<SelectUserButtonProps>,
) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onClick = () => {
    const dialogEl = document.getElementById(
      props.dialogId,
    ) as HTMLDialogElement | null;
    dialogEl?.showModal();
  };

  // react compiler handles useCallback
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onDialogClose = () => {
    const dialogEl = document.getElementById(
      props.dialogId,
    ) as HTMLDialogElement | null;

    const userId = dialogEl?.returnValue;
    if (!userId) return;

    const params = new URLSearchParams(searchParams);
    params.set("userId", userId);

    router.push(pathname + "?" + params.toString());
  };

  useEffect(() => {
    const dialogEl = document.getElementById(
      props.dialogId,
    ) as HTMLDialogElement | null;
    if (!dialogEl) return;

    dialogEl.addEventListener("close", onDialogClose);

    return () => {
      dialogEl.removeEventListener("close", onDialogClose);
    };
  }, [onDialogClose, props.dialogId]);

  return (
    <Button variant="gray" onClick={onClick}>
      Select User
    </Button>
  );
}
