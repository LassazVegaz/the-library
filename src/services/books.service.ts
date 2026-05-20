import { Book } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";

type UpdateBook = Partial<Pick<Book, "title" | "copies">>;

type CreateBook = Pick<Book, "title" | "copies">;

class BooksService {
  async create(book: CreateBook) {
    return await prisma.book.create({ data: book });
  }

  async update(id: number, book: UpdateBook) {
    return await prisma.book.update({ where: { id }, data: book });
  }

  async delete(id: number) {
    await prisma.book.delete({ where: { id } });
  }

  async findById(id: number) {
    return await prisma.book.findUnique({ where: { id } });
  }

  async getAll() {
    return await prisma.book.findMany();
  }
}

const booksService = new BooksService();

export default booksService;
