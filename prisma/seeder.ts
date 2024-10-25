import { PrismaClient } from "@prisma/client";
import { BookSchema, type Book } from "./zod";
const prisma = new PrismaClient();

import seeds from "./seeds.json";
async function main() {
  // const addAuthor = async (name: string) => {
  //   await prisma.author.upsert({
  //     where: {

  //     },
  //     data: {
  //       name,
  //     },
  //   });
  // };

  // const getAuthors = () => {
  //   seeds.forEach(async ({ name }) => await addAuthor(name));
  //   console.log("Done!");
  // };

  // getAuthors();

  const addBook = async (book: Book) => {
    book.isbn = `${book.isbn}`;
    const bookParsed = BookSchema.parse({ ...book, isbn: `${book.isbn}` });

    await prisma.book.upsert({
      where: {
        isbn: bookParsed.isbn,
      },
      update: { ...bookParsed },
      create: { ...bookParsed },
    });
  };

  const getBooks = () => {
    seeds.forEach(async (seed) => {
      await addBook({ ...seed, isbn: `${seed.isbn}` });
    });
    console.log("Done!");
  };

  getBooks();
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
