"use client";
import {
  FieldsContainer,
  Label,
  InputField,
  Button,
} from "@/components/FormComponents";
import {
  handleActionErrors,
  handleServerError,
} from "@/lib/client/error-handlers";
import Link from "next/link";
import { SubmitEventHandler, useState } from "react";
import { signInAction } from "../actions";

export default function Form() {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const res = await signInAction(formData);
      if (res === false) alert("Invalid email or password. Please try again.");
      else handleActionErrors(res);
    } catch (error) {
      handleServerError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="border p-4 rounded flex flex-col gap-3"
      onSubmit={onSubmit}
    >
      <FieldsContainer>
        <Label htmlFor="email">Email</Label>
        <InputField type="email" name="email" required />
      </FieldsContainer>
      <FieldsContainer>
        <Label htmlFor="password">Password</Label>
        <InputField type="password" name="password" required />
      </FieldsContainer>

      <Button
        variant="blue"
        type="submit"
        disabled={isLoading}
        className="mt-10"
      >
        Sign In
      </Button>

      <p className="text-sm text-center">
        Don&apos;t have an account?{" "}
        <Link href="/users/new" className="text-blue-500 hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
}
