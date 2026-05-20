import { Button } from "@/components/FormComponents";
import PageTitle from "@/components/PageTitle";
import SubTitle from "@/components/SubTitle";
import SelectUserButton from "./components/SelectUserButton";
import { ButtonListItem, ListContainer } from "@/components/List";
import authService from "@/services/auth.service";
import { notFound } from "next/navigation";
import usersService from "@/services/users.service";
import booksService from "@/services/books.service";
import booksBorrowingService from "@/services/books-borrowing.service";

const getBook = async (id: string) => {
  const idN = Number.parseInt(id);
  if (Number.isNaN(idN)) return null;

  return await booksService.findById(idN);
};

const getUserId = (
  searchParams: Awaited<PageProps<"/books/[id]/lend">["searchParams"]>,
) => {
  const userIdStr = searchParams["userId"];
  if (typeof userIdStr !== "string") return null;

  const userId = Number.parseInt(userIdStr);
  return Number.isNaN(userId) ? null : userId;
};

export default async function LendBookPage(
  props: Readonly<PageProps<"/books/[id]/lend">>,
) {
  if (!authService.is("admin")) notFound();

  const params = await props.params;

  const book = await getBook(params.id);
  if (!book) notFound();

  const users = await usersService.getAll();

  const searchParams = await props.searchParams;
  const userId = getUserId(searchParams);
  const user = userId ? users.find((u) => u.id === userId) : undefined;

  const borrowedMax =
    userId === null || user === undefined
      ? undefined
      : (await booksBorrowingService.borrowedCount(userId)) > 0;

  const dialogId = "select-user-dialog";

  return (
    <>
      <div className="py-page-gutter grid grid-cols-2 grid-rows-[auto_1fr_auto] h-full gap-y-10">
        <PageTitle className="col-[span_2]">Lend Book</PageTitle>

        <div className="px-10 border-r border-amber-100">
          <SubTitle>Book information</SubTitle>

          <div className="mt-10">
            <div>Title: {book.title}</div>
            <div>Number of copies: {book.copies}</div>
          </div>
        </div>

        <div className="px-10 grid grid-rows-[auto_1fr_auto]">
          <SubTitle>User information</SubTitle>

          {user ? (
            <div className="mt-10">
              <div>Name: {user.name}</div>
              <div>Email: {user.email}</div>

              {borrowedMax && (
                <p className="text-red-300 mt-5">
                  This user has borrowed maximum allowed number of books
                </p>
              )}
            </div>
          ) : (
            <p className="mt-10 text-dimmed text-center text-sm">
              {searchParams["userId"] === undefined
                ? "Please select a user"
                : "User not found"}
            </p>
          )}

          <div className="flex justify-center">
            <SelectUserButton dialogId={dialogId} />
          </div>
        </div>

        <div className="col-[span_2] flex justify-center">
          <Button
            variant="blue"
            disabled={
              book.copies === 0 || user === undefined || borrowedMax === true
            }
          >
            Lend
          </Button>
        </div>
      </div>

      <dialog
        id={dialogId}
        className="bg-gray-800 p-page-gutter rounded-xl grid-rows-[auto_1fr] gap-10"
      >
        <SubTitle>Select a User</SubTitle>

        {users.length === 0 && (
          <p className="text-dimmed w-100 text-center">No users found</p>
        )}

        <form method="dialog">
          <ListContainer>
            {users.map((u) => (
              <ButtonListItem key={u.id} value={u.id} className="w-100">
                {u.name}
              </ButtonListItem>
            ))}
          </ListContainer>
        </form>
      </dialog>
    </>
  );
}
