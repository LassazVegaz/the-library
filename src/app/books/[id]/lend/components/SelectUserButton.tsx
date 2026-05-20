"use client";
import { Button } from "@/components/FormComponents";

type SelectUserButtonProps = {
  dialogId: string;
};

export default function SelectUserButton(
  props: Readonly<SelectUserButtonProps>,
) {
  const onClick = () => {
    const dialogEl = document.getElementById(
      props.dialogId,
    ) as HTMLDialogElement | null;
    dialogEl?.showModal();
  };

  return (
    <Button variant="gray" onClick={onClick}>
      Select User
    </Button>
  );
}
