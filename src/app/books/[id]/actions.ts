"use server";
import { buildZodErrorResponse, serverErrorResponse } from "@/lib/responses";
import authService from "@/services/auth.service";
import booksService from "@/services/books.service";
import { revalidatePath } from "next/cache";
import { redirect, unauthorized } from "next/navigation";
import * as z from "zod";

const schema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  copies: z.coerce
    .number("Invalid number of copies")
    .int("Number of copies must be a whole number")
    .nonnegative("Number of coppies cannot be a negative number"),
});

export const createAction = async (form: FormData) => {
  if (!(await authService.is("admin"))) unauthorized();

  const validatedFields = schema.safeParse(Object.fromEntries(form.entries()));

  if (validatedFields.success) {
    let bookId: number | null = null;

    try {
      const created = await booksService.create(validatedFields.data);
      revalidatePath("/books");
      bookId = created.id;
    } catch (error) {
      console.error("An error occurred while creating the book:", error);
      return serverErrorResponse;
    }

    redirect(`/books/${bookId}`);
  } else {
    return buildZodErrorResponse(validatedFields.error);
  }
};

export const updateAction = async (id: number, form: FormData) => {
  if (!(await authService.is("admin"))) unauthorized();

  const validatedFields = schema.safeParse(Object.fromEntries(form.entries()));

  if (validatedFields.success) {
    try {
      await booksService.update(id, validatedFields.data);
      revalidatePath("/books");
    } catch (error) {
      console.error("An error occurred while updating the book:", error);
      return serverErrorResponse;
    }
  } else {
    return buildZodErrorResponse(validatedFields.error);
  }
};

export const deleteAction = async (id: number) => {
  if (!(await authService.is("admin"))) unauthorized();

  let deleted = false;

  try {
    await booksService.delete(id);
    revalidatePath("/books");
    deleted = true;
  } catch (error) {
    console.error("An error occurred while deleting the book:", error);
    return serverErrorResponse;
  }

  if (deleted) redirect("/books");
};
