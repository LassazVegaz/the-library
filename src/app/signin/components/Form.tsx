"use client";
import {
  FieldsContainer,
  Label,
  InputField,
  Button,
} from "@/components/FormComponents";
import Link from "next/link";
import { useState } from "react";

export default function Form() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <form className="border p-4 rounded flex flex-col gap-3">
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
