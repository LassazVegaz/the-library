"use client";
import { MouseEventHandler, SubmitEventHandler, useState } from "react";
import { Book } from "@/generated/prisma/browser";
import { createAction, deleteAction, updateAction } from "../actions";
import {
  Button,
  FieldsContainer,
  InputField,
  Label,
  LinkButton,
} from "@/components/FormComponents";

type FormProps = {
  isNew: boolean;
  book: Book | null;
  isAdmin: boolean;
};

const handleServerError = (error: unknown) => {
  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    error.message === "NEXT_REDIRECT"
  ) {
    throw error; // Rethrow the redirect error to be handled by Next.js
  } else {
    console.error("An error occurred while submitting the form:", error);
    alert("An error occurred while submitting the form. Please try again.");
  }
};

const handleActionErrors = (
  error: { formErrors: Record<string, string[]> } | { serverError: true },
) => {
  if ("serverError" in error) {
    alert("An error occurred while submitting the form. Please try again.");
  } else {
    const firstMessage = Object.values(error.formErrors)[0]?.[0];
    if (firstMessage) alert(firstMessage);
  }
};

export default function Form(props: Readonly<FormProps>) {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const promise =
        props.book === null
          ? createAction(formData)
          : updateAction(props.book.id, formData);
      const res = await promise;
      if (res) handleActionErrors(res);
    } catch (error) {
      handleServerError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete: MouseEventHandler<HTMLButtonElement> = async () => {
    if (!props.book) return;

    setIsLoading(true);
    try {
      const res = await deleteAction(props.book.id);
      if (res) handleActionErrors(res);
    } catch (error) {
      handleServerError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="border p-4 rounded flex flex-col gap-4"
      onSubmit={onSubmit}
    >
      <FieldsContainer>
        <Label htmlFor="title">Title</Label>
        <InputField
          type="text"
          name="title"
          required
          defaultValue={props.book?.title || ""}
          readOnly={!props.isAdmin}
        />
      </FieldsContainer>

      {props.isAdmin && (
        <>
          <div className="flex justify-between mt-10">
            <LinkButton variant="gray" href="/books" disabled={isLoading}>
              Cancel
            </LinkButton>
            <Button variant="blue" type="submit" disabled={isLoading}>
              {props.isNew ? "Add" : "Update"}
            </Button>
            {!props.isNew && (
              <Button
                variant="red"
                type="button"
                onClick={onDelete}
                disabled={isLoading}
              >
                Delete
              </Button>
            )}
          </div>
          <LinkButton href={`${props.book?.id}/lend`} variant="gray">
            Lend book
          </LinkButton>
        </>
      )}
    </form>
  );
}
