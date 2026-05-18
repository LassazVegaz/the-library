"use server";
import booksService from "@/services/books.service";
import { redirect } from "next/navigation";
import * as z from "zod";

const schema = z.object({
  title: z.string().trim().min(1, "Title is required"),
});

const serverErrorResponse = { serverError: true } as const;

const buildZodErrorResponse = <T>(error: z.ZodError<T>) => {
  return {
    formErrors: z.flattenError(error).fieldErrors,
  };
};

export const createAction = async (form: FormData) => {
  const validatedFields = schema.safeParse(Object.fromEntries(form.entries()));

  if (validatedFields.success) {
    let bookId: number | null = null;

    try {
      const created = await booksService.create(validatedFields.data);
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
  const validatedFields = schema.safeParse(Object.fromEntries(form.entries()));

  if (validatedFields.success) {
    try {
      await booksService.update(id, validatedFields.data);
    } catch (error) {
      console.error("An error occurred while updating the book:", error);
      return serverErrorResponse;
    }
  } else {
    return buildZodErrorResponse(validatedFields.error);
  }
};
