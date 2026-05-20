"use server";
import authService from "@/services/auth.service";
import booksBorrowingService from "@/services/books-borrowing.service";
import { unauthorized } from "next/navigation";

type LendActionParams = {
  userId: number;
  bookId: number;
};

export const lendAction = async (params: LendActionParams) => {
  if (!(await authService.is("admin"))) unauthorized();
  console.log("params", params);

  await booksBorrowingService.lend(params.bookId, params.userId);
};
