import prisma from "@/lib/prisma";

type RemainingCopiesQR = {
  remaining_copies: number;
};

class BooksBorrowingService {
  async lend(bookId: number, userId: number) {
    const borrowedCount = await this.borrowedCount(userId);
    if (borrowedCount > 0)
      throw new Error(
        `User ${userId} has borrowed maximum allowed number of books (${borrowedCount})`,
      );

    const remainingCopies = await this.remainingCopies(bookId);
    if (remainingCopies === 0)
      throw new Error(`Book ${bookId} has no copies left to lend`);

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

  async lendedCopies(bookId: number) {
    return await prisma.borrowing.count({
      where: {
        bookId,
        returnedOn: null,
      },
    });
  }

  async remainingCopies(bookId: number) {
    const res = await prisma.$queryRaw<RemainingCopiesQR[]>`
SELECT
    (b.copies - COUNT(CASE WHEN br.returnedOn IS NULL THEN 1 END)) AS remaining_copies
FROM 
    "Book" b
LEFT JOIN 
    "Borrowing" br ON b.id = br.bookId
WHERE 
    b.id = ${bookId}
GROUP BY 
    b.id;`;

    const copies = res[0]?.remaining_copies || 0;
    return copies === -1 ? 0 : copies;
  }
}

const booksBorrowingService = new BooksBorrowingService();

export default booksBorrowingService;
