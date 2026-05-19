"use server";
import * as z from "zod";
import authService from "@/services/auth.service";
import { buildZodErrorResponse, serverErrorResponse } from "@/lib/responses";
import { redirect } from "next/navigation";

const schema = z.object({
  email: z.email("Invalid email address").trim(),
  password: z.string("Password is required").min(1, "Password is required"),
});

export const signInAction = async (form: FormData) => {
  const validatedFields = schema.safeParse(Object.fromEntries(form.entries()));

  if (validatedFields.success) {
    const data = validatedFields.data;

    let validCredentials: boolean;
    try {
      validCredentials = await authService.signIn(data.email, data.password);
    } catch (error) {
      console.error("An error occurred during sign-in:", error);
      return serverErrorResponse;
    }

    if (validCredentials) {
      redirect("/books");
    } else {
      return false;
    }
  } else {
    return buildZodErrorResponse(validatedFields.error);
  }
};
