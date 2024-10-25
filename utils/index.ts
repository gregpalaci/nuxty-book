import { type Book } from "~/prisma/zod";

export const goodreads = (isbn: Book["isbn"]) =>
  `https://www.goodreads.com/search?q=${isbn}`;

export const getGoodReadURL = async (isbn: Book["isbn"]) => goodreads(isbn);
