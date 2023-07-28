import prisma from "../prisma/prisma";

export const selectProducts = async (query: ProductsUrlParams) => {
    const { 
        limit = 25, 
        page = 1,
        minPrice = 0,
        maxPrice = 1e5,
        category = '',
        supplier = '',
        hideOutOfStock = false,
        sortBy = 'id',
        order = 'asc'
      } = query;
    
    const numberOfOrders = {
      include: { _count: { select: { orderItems: true } } } 
    };

    const queryOptions = {
      where: {
        AND: [ 
          { NOT: { stock: hideOutOfStock ? 0 : -1 } },
          {
            price: { 
              gte: Number(minPrice),
              lte: Number(maxPrice)
            }
          },
          { categoryName: { contains: category, mode: 'insensitive' } as ProductQueryParam },
          { supplierName: { contains: supplier, mode: 'insensitive'  } as ProductQueryParam }
        ]
      },
      orderBy: {
        [sortBy as string]: order,
      }
    };

    return await prisma.$transaction([
      prisma.product.count(queryOptions),
      prisma.product.findMany({
        ...queryOptions,
        ...numberOfOrders,
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit),
        })
    ]);
}

export const selectBestsellers = async (
    category: string, 
    supplier: string, 
    page: string, 
    limit: string) => {

    return await prisma.$transaction([
      prisma.$queryRaw<[{ count: number }]>`
        SELECT COUNT(*)::INTEGER 
        FROM (
          SELECT DISTINCT oi."productId" 
          FROM "OrderItem" oi, "Product" p, "Review" r
          WHERE p."id" = oi."productId"
          AND p."id" = r."productId"
          AND p."categoryName" ILIKE ${`%${category}%`}
          AND p."supplierName" ILIKE ${`%${supplier}%`}
        ) AS temp
      `,
      prisma.$queryRaw<(Product & ProductExtended)[]>`
        SELECT 
          p."id",
          COUNT(oi."orderId")::INTEGER AS "numOfTimesOrdered",
          SUM(oi."quantity")::INTEGER AS "totalUnitsOrdered",
          ROUND(AVG(r."rating"), 2) AS "averageRating",
          p."name",
          p."description", 
          p."price",
          p."stock", 
          p."categoryName", 
          p."supplierName", 
          p."thumbnail"
        FROM "Product" p, "OrderItem" oi, "Review" r
        WHERE p."id" = oi."productId"
        AND p."id" = r."productId"
        AND p."categoryName" ILIKE ${`%${category}%`}
        AND p."supplierName" ILIKE ${`%${supplier}%`}
        GROUP BY 1
        ORDER BY 2 DESC
        LIMIT ${Number(limit)}
        OFFSET ${(Number(page) - 1) * Number(limit)}
      `
    ]);
}

export const selectProductById = async (productId: number) => {
  return await prisma.$transaction([
    prisma.review.aggregate({
      _avg: { rating: true },
      _count: { rating: true },
      where: { productId }
    }),
    prisma.product.findUnique({
      select: { _count: { select: { orderItems: true } } },
      where: { id: productId }
    })
  ]);
}