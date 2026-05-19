import PageTitle from "@/components/PageTitle";
import Form from "./components/Form";
import { Book } from "@/generated/prisma/client";
import booksService from "@/services/books.service";
import { notFound } from "next/navigation";
import authService from "@/services/auth.service";

export default async function BookPage(
  props: Readonly<PageProps<"/books/[id]">>,
) {
  const auth = await authService.getAuth();
  if (!auth) notFound();

  const { id } = await props.params;

  const isNew = id.toLowerCase() === "new";

  let book: Book | null = null;

  if (isNew) {
    if (auth.role !== "admin") notFound();
  } else {
    const bookId = Number(id);
    if (Number.isNaN(bookId)) notFound();
    book = await booksService.findById(bookId);
    if (!book) notFound();
  }

  return (
    <div className="h-full w-full grid grid-rows-[auto_1fr] pt-page-gutter">
      <PageTitle>{isNew ? "Create a New Book" : "Update Book"}</PageTitle>

      <div className="flex justify-center items-center">
        <Form isNew={isNew} book={book} isAdmin={auth.role === "admin"} />
      </div>
    </div>
  );
}
