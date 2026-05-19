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
import { SafeUser } from "@/types/user.type";
import { MouseEventHandler, SubmitEventHandler, useState } from "react";
import { createAction, deleteAction, updateAction } from "../actions";
import Role from "@/types/role.type";
import Link from "next/link";

type FormProps = {
  isNew: boolean;
  user: SafeUser | null;
  role?: Role;
  isOwner?: boolean;
};

export default function Form(props: Readonly<FormProps>) {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const promise =
        props.user === null
          ? createAction(formData)
          : updateAction(props.user.id, formData);
      const res = await promise;
      if (res) handleActionErrors(res);
    } catch (error) {
      handleServerError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete: MouseEventHandler<HTMLButtonElement> = async () => {
    if (!props.user) return;

    setIsLoading(true);
    try {
      const res = await deleteAction(props.user.id);
      if (res) handleActionErrors(res);
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
        <Label htmlFor="name">Name</Label>
        <InputField
          type="text"
          name="name"
          required
          defaultValue={props.user?.name || ""}
          readOnly={!props.isOwner || !props.isNew}
        />
      </FieldsContainer>
      <FieldsContainer>
        <Label htmlFor="email">Email</Label>
        <InputField
          type="email"
          name="email"
          required
          defaultValue={props.user?.email || ""}
          readOnly={!props.isNew}
        />
      </FieldsContainer>
      {props.isNew && (
        <>
          <FieldsContainer>
            <Label htmlFor="password">Password</Label>
            <InputField type="password" name="password" required />
          </FieldsContainer>
          <FieldsContainer>
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <InputField type="password" name="confirmPassword" required />
          </FieldsContainer>
        </>
      )}

      {props.isNew && (
        <>
          <Button
            variant="blue"
            type="submit"
            disabled={isLoading}
            className="mt-10"
          >
            Create Account
          </Button>
          <p className="text-sm text-center">
            Already have an account?{" "}
            <Link href="/signin" className="text-blue-500 hover:underline">
              Sign in
            </Link>
          </p>
        </>
      )}

      {props.isOwner && (
        <>
          <Button
            variant="blue"
            type="submit"
            disabled={isLoading}
            className="mt-10"
          >
            Update Account
          </Button>
          <Button
            variant="red"
            type="button"
            onClick={onDelete}
            disabled={isLoading}
          >
            Delete Account
          </Button>
        </>
      )}
    </form>
  );
}
