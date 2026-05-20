import prisma from "@/lib/prisma";

class BooksBorrowingService {
  async lend(bookId: number, userId: number) {
    const borrowedCount = await this.borrowedCount(userId);
    if (borrowedCount > 0)
      throw new Error(
        `User ${userId} has borrowed maximum allowed number of books (${borrowedCount})`,
      );

    await prisma.borrowing.create({
      data: {
        bookId,
        userId,
      },
    });
  }

  async borrowedCount(userId: number) {
    return await prisma.borrowing.count({
      where: {
        userId,
        returnedOn: null,
      },
    });
  }
}

const booksBorrowingService = new BooksBorrowingService();

export default booksBorrowingService;
