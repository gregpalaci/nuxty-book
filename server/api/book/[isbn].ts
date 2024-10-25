import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const isbn = getRouterParam(event, "isbn");

  return await prisma.book.findFirst({
    where: {
      isbn: {
        equals: isbn,
      },
    },
  });
});
