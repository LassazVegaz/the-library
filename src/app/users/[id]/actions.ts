"use server";
import { buildZodErrorResponse, serverErrorResponse } from "@/lib/responses";
import usersService from "@/services/users.service";
import { revalidatePath } from "next/cache";
import { redirect, unauthorized } from "next/navigation";
import { createUserSchema, updateUserSchema } from "./schemas";
import authService from "@/services/auth.service";

export const createAction = async (form: FormData) => {
  if (await authService.getAuth()) unauthorized();

  const validatedFields = await createUserSchema.safeParseAsync(
    Object.fromEntries(form.entries()),
  );

  if (validatedFields.success) {
    let created = false;

    try {
      await usersService.create(validatedFields.data);
      revalidatePath("/users");
      created = true;
    } catch (error) {
      console.error("An error occurred while creating the user:", error);
      return serverErrorResponse;
    }

    if (created) redirect("/signin");
  } else {
    return buildZodErrorResponse(validatedFields.error);
  }
};

export const updateAction = async (id: number, form: FormData) => {
  if (!(await authService.is(id))) unauthorized();

  const validatedFields = updateUserSchema.safeParse(
    Object.fromEntries(form.entries()),
  );

  if (validatedFields.success) {
    try {
      await usersService.update(id, validatedFields.data);
      revalidatePath("/users");
    } catch (error) {
      console.error("An error occurred while updating the user:", error);
      return serverErrorResponse;
    }
  } else {
    return buildZodErrorResponse(validatedFields.error);
  }
};

export const deleteAction = async (id: number) => {
  if (!(await authService.is(id))) unauthorized();

  let deleted = false;

  try {
    await usersService.delete(id);
    revalidatePath("/users");
    deleted = true;
  } catch (error) {
    console.error("An error occurred while deleting the user:", error);
    return serverErrorResponse;
  }

  if (deleted) redirect("/users");
};
