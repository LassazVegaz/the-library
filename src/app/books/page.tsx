import Link from "next/link";
import PageTitle from "@/components/PageTitle";
import FloatingActionButton from "@/components/FloatingActionButton";
import booksService from "@/services/books.service";

export default async function BooksPage() {
  const books = await booksService.getAll();

  return (
    <>
      <div className="py-page-gutter grid grid-rows-[auto_1fr] max-h-full">
        <PageTitle>Books</PageTitle>

        <ul className="mt-10 max-w-md w-full mx-auto flex flex-col gap-4 overflow-y-auto px-5 styled-scrollbar">
          {books.map((b) => (
            <li key={b.id}>
              <Link
                href={`books/${b.id}`}
                className="block border border-gray-300 rounded-md p-2 hover:bg-gray-100 hover:text-black duration-500 cursor-pointer"
              >
                {b.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <FloatingActionButton href="books/new">+</FloatingActionButton>
    </>
  );
}
