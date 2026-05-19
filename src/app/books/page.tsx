import PageTitle from "@/components/PageTitle";
import FloatingActionButton from "@/components/FloatingActionButton";
import booksService from "@/services/books.service";
import { LinkedListItem, ListContainer } from "@/components/List";
import authService from "@/services/auth.service";
import { notFound } from "next/navigation";

export default async function BooksPage() {
  const auth = await authService.getAuth();
  if (!auth) notFound();

  const books = await booksService.getAll();

  return (
    <>
      <div className="py-page-gutter grid grid-rows-[auto_1fr] max-h-full">
        <PageTitle>Books</PageTitle>

        {books.length === 0 && (
          <p className="text-center text-dimmed mt-10">
            No books found. Click the + button to add a new book.
          </p>
        )}

        <ListContainer className="mt-10 max-w-md w-full mx-auto">
          {books.map((b) => (
            <li key={b.id}>
              <LinkedListItem href={`books/${b.id}`}>{b.title}</LinkedListItem>
            </li>
          ))}
        </ListContainer>
      </div>

      {auth.role === "admin" && (
        <FloatingActionButton href="books/new">+</FloatingActionButton>
      )}
    </>
  );
}
