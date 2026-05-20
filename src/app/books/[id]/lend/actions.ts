"use server";

import booksBorrowingService from "@/services/books-borrowing.service";

export const lendAction = async (userId: number, bookId: number) => {
  await booksBorrowingService.lend(userId, bookId);
};
