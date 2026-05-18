"use client";
import { ComponentProps, MouseEventHandler, SubmitEventHandler } from "react";
import { twMerge } from "tailwind-merge";
import { Book } from "@/generated/prisma/browser";
import { createAction, deleteAction, updateAction } from "../actions";
import Link from "next/link";

type FormProps = {
  isNew: boolean;
  book: Book | null;
};

const FieldsContainer = ({ className, ...props }: ComponentProps<"div">) => (
  <div className={twMerge("flex items-center", className)} {...props} />
);

const Label = ({ className, ...props }: ComponentProps<"label">) => (
  <label className={twMerge("w-37.5", className)} {...props} /> // NOSONAR
);

const InputField = ({ className, ...props }: ComponentProps<"input">) => (
  <input className={twMerge("border p-2 rounded", className)} {...props} />
);

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
  const onSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

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
    }
  };

  const onDelete: MouseEventHandler<HTMLButtonElement> = async () => {
    if (!props.book) return;

    try {
      const res = await deleteAction(props.book.id);
      if (res) handleActionErrors(res);
    } catch (error) {
      handleServerError(error);
    }
  };

  return (
    <form className="border p-4 rounded" onSubmit={onSubmit}>
      <FieldsContainer>
        <Label htmlFor="title">Title</Label>
        <InputField
          type="text"
          name="title"
          required
          defaultValue={props.book?.title || ""}
        />
      </FieldsContainer>

      <div className="flex justify-between mt-10">
        <Link href="/books" className="bg-gray-500 px-4 py-2 rounded">
          Cancel
        </Link>
        <button type="submit" className="bg-blue-500 px-4 py-2 rounded">
          {props.isNew ? "Add" : "Update"}
        </button>
        {!props.isNew && (
          <button onClick={onDelete} className="bg-red-500 px-4 py-2 rounded">
            Delete
          </button>
        )}
      </div>
    </form>
  );
}
