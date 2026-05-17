import PageTitle from "@/components/PageTitle";

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
    <div className="py-page-gutter grid grid-rows-[auto_1fr] max-h-full">
      <PageTitle>Books</PageTitle>

      <ul className="mt-10 max-w-md w-full mx-auto flex flex-col gap-2 overflow-y-auto px-5 styled-scrollbar">
        {bookTitles.map((title) => (
          <li
            className="border border-gray-300 rounded-md p-2 mb-2 hover:bg-gray-100 hover:text-black duration-500 cursor-pointer"
            key={title}
          >
            {title}
          </li>
        ))}
      </ul>
    </div>
  );
}
