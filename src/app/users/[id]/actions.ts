"use server";
import { buildZodErrorResponse, serverErrorResponse } from "@/lib/responses";
import usersService from "@/services/users.service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createUserSchema, updateUserSchema } from "./schemas";

export const createAction = async (form: FormData) => {
  const validatedFields = createUserSchema.safeParse(
    Object.fromEntries(form.entries()),
  );

  if (validatedFields.success) {
    let userId: number | null = null;

    try {
      const created = await usersService.create(validatedFields.data);
      revalidatePath("/users");
      userId = created.id;
    } catch (error) {
      console.error("An error occurred while creating the user:", error);
      return serverErrorResponse;
    }

    redirect(`/users/${userId}`);
  } else {
    return buildZodErrorResponse(validatedFields.error);
  }
};

export const updateAction = async (id: number, form: FormData) => {
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
