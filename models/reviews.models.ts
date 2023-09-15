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
      product: { }
    }
  };

  const columnToOrderBy = ["createdAt", "rating"].includes(orderBy) ? orderBy : "createdAt";

  const transaction = [
    prisma.review.count({ where }),
    prisma.review.findMany({
      ...queryOptions,
      orderBy: { [columnToOrderBy]: 'desc' },
      skip: (page - 1) * limit,
      take: limit
    })
  ];

  if (where?.customerId) {
    const customer = prisma.customer.findUnique({ where: { id: where.customerId } });
    return await prisma.$transaction([...transaction, customer])
  } else {
    return await prisma.$transaction(transaction);
  }
}