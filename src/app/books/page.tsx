import Link from "next/link";
import PageTitle from "@/components/PageTitle";
import FloatingActionButton from "@/components/FloatingActionButton";

const bookTitles = [
  "The Great Gatsby",
  "To Kill a Mockingbird",
  "1984",
  "Pride and Prejudice",
  "The Catcher in the Rye",
  "The Lord of the Rings",
  "Harry Potter and the Sorcerer's Stone",
  "The Hobbit",
  "The Hobbit 2",
  "The Hobbit 3",
  "The Hobbit 4",
  "The Hobbit 5",
];

export default function BooksPage() {
  return (
    <>
      <div className="py-page-gutter grid grid-rows-[auto_1fr] max-h-full">
        <PageTitle>Books</PageTitle>

        <ul className="mt-10 max-w-md w-full mx-auto flex flex-col gap-4 overflow-y-auto px-5 styled-scrollbar">
          {bookTitles.map((title) => (
            <li key={title}>
              <Link
                href="books/1"
                className="block border border-gray-300 rounded-md p-2 hover:bg-gray-100 hover:text-black duration-500 cursor-pointer"
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <FloatingActionButton href="books/new">+</FloatingActionButton>
    </>
  );
}
