import prisma from "../prisma/prisma";

export const selectReviews = async (
    queryOptions: { where: { [key: string]: unknown } }, 
    page: number, 
    limit: number
  ) => {

  return await prisma.$transaction([
    prisma.review.count(queryOptions),
    prisma.review.findMany({
      ...queryOptions,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit
    })
  ]);
}