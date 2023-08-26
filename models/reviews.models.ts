import prisma from "../prisma/prisma";

export const selectReviews = async (
    where: { productId?: number, customerId?: number }, 
    page: number, 
    limit: number,
    orderBy: string
  ) => {

  const queryOptions = { 
    where,
    include: {
      customer: {
        select: { 
          username: true,
          avatar: true 
        }
      },
      product: {
        select: { 
          name: true,
          categoryName: true,
          supplierName: true,
          thumbnail: true
        }
      }
    }
  };

  const columnToOrderBy = ["createdAt", "rating"].includes(orderBy) ? orderBy : "createdAt";

  return await prisma.$transaction([
    prisma.review.count({ where }),
    prisma.review.findMany({
      ...queryOptions,
      orderBy: { [columnToOrderBy]: 'desc' },
      skip: (page - 1) * limit,
      take: limit
    })
  ]);
}