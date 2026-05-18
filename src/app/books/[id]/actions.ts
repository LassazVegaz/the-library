"use server";
import booksService from "@/services/books.service";
import { redirect } from "next/navigation";
import * as z from "zod";

const createBookSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

export const createAction = async (form: FormData) => {
  const validatedFields = createBookSchema.safeParse(
    Object.fromEntries(form.entries()),
  );

  if (validatedFields.success) {
    let bookId: number | null = null;

    try {
      const created = await booksService.create(validatedFields.data);
      bookId = created.id;
    } catch (error) {
      console.error("An error occurred while creating the book:", error);
      return {
        errors: { serverError: true },
      };
    }

    redirect(`/books/${bookId}`);
  } else {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
    };
  }
};
