"use client";
import { ComponentProps, SubmitEventHandler } from "react";
import { twMerge } from "tailwind-merge";
import { createAction } from "../actions";

type FormProps = {
  isNew: boolean;
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

const handleError = (error: unknown) => {
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

export default function Form(props: Readonly<FormProps>) {
  const onSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      await createAction(new FormData(e.currentTarget));
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <form className="border p-4 rounded" onSubmit={onSubmit}>
      <FieldsContainer>
        <Label htmlFor="title">Title</Label>
        <InputField type="text" name="title" required />
      </FieldsContainer>

      <div className="flex justify-center mt-10">
        <button type="submit" className="bg-blue-500 px-4 py-2 rounded">
          {props.isNew ? "Add" : "Update"}
        </button>
      </div>
    </form>
  );
}
