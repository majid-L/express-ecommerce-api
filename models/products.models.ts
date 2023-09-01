import { Prisma } from "@prisma/client";
import prisma from "../prisma/prisma";

export const selectProducts = async (query: ProductsUrlParams) => {
  const { 
    limit, 
    page,
    minPrice,
    maxPrice,
    category,
    supplier,
    product,
    hideOutOfStock,
    orderBy,
    order,
    avgRating
  } = query;

  const stock = hideOutOfStock === "true" ? '0' : '-1';
  const offset = (Number(page) - 1) * Number(limit);

  let countQuery = `
    SELECT COUNT(*)::INTEGER 
    FROM (
      SELECT p."id"
      FROM "Product" p
      LEFT JOIN "Review" r
      ON p."id" = r."productId"
      WHERE p."categoryName" ILIKE '%${category}%'
      AND p."supplierName" ILIKE '%${supplier}%'
      AND p."name" ILIKE '%${product}%'
      AND p."price" ::DECIMAL BETWEEN ${minPrice} AND ${maxPrice}
      AND p."stock" != ${stock}
      GROUP BY 1
    `;

    let productQuery = `
      SELECT
        p."id",
        p."name",
        COUNT(oi."orderId")::INTEGER AS "numOfTimesOrdered",
        SUM(oi."quantity")::INTEGER AS "totalUnitsOrdered",
        COUNT(r."id")::INTEGER AS "numOfReviews",
        ROUND(AVG(r."rating"), 2) AS "averageRating",
        p."description",
        p."price",
        p."stock", 
        p."categoryName", 
        p."supplierName", 
        p."thumbnail"
      FROM "Product" p
      LEFT JOIN "OrderItem" oi
      ON p."id" = oi."productId"
      LEFT JOIN "Review" r
      ON p."id" = r."productId"
      AND oi."orderId" = r."orderId"
      WHERE p."categoryName" ILIKE '%${category}%'
      AND p."supplierName" ILIKE '%${supplier}%'
      AND p."name" ILIKE '%${product}%'
      AND p."price" ::DECIMAL BETWEEN ${minPrice} AND ${maxPrice}
      AND p."stock" != ${stock}
      GROUP BY 1
    `;

    if (avgRating) {
      const havingClause = `HAVING ROUND(AVG(r."rating")) = ${avgRating}`;
      productQuery += havingClause;
      countQuery += havingClause;
    }

    countQuery += `) AS temp`;

    productQuery += 
      orderBy === "avgRating" ? 'ORDER BY AVG(r."rating")'
      : orderBy === "bestsellers" ? 'ORDER BY COUNT(oi."orderId")'
      : `ORDER BY p."${orderBy}"`;
      
    productQuery += `
      ${order} NULLS LAST
      LIMIT ${limit}
      OFFSET ${offset};
    `;

    const transaction = await prisma.$transaction([
      prisma.$queryRaw<[{ count: number }]>(Prisma.raw(countQuery)),
      prisma.$queryRaw<(Product & ProductExtended)[]>(Prisma.raw(productQuery))
    ]);

    return transaction;
}

export const selectFavorites = async (page: number, limit: number, id: number) => {
  const [count, favorites] = await prisma.$transaction([
    prisma.review.count({
      where: { 
        customerId: id,
        recommend: true
      },
    }),
    prisma.customer.findUnique({
      where: { id },
      select: {
        reviews: {
          where: {
            recommend: true,
          },
          include: {
            product: {}
          },
          orderBy: {
            createdAt: 'desc'
          },
          skip: isNaN(page) || isNaN(limit) ? 0 : (page - 1) * limit,
          take: isNaN(limit) ? 25 : limit
        }
      }
    })
  ]);

  return {
    page,
    count: favorites?.reviews.length,
    totalResults: count,
    favorites: favorites?.reviews.map(({ createdAt, ...product }) => {
      return { addedAt: createdAt , ...product }
    })
  };
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

export const updateProduct = async (productId: number, stock: number) => {
  return await prisma.product.update({
    where: { id: productId },
    data: { stock }
  });
}

export const checkOrderHistory = async (
  productId: number, 
  customerId: number
) => {
  const productFromQuery = await prisma.product.findUnique({ 
    where: { id: productId } 
  });

  if (!productFromQuery) {
    return { notFound: `Product with id ${productId} does not exist.`};
  }

  const ordersIds = (await prisma.order.findMany({
    where: { customerId }
  })).map(order => order.id);
  
  const orderOrNull = await prisma.order.findFirst({
    where: {
      AND: [
        { customerId },
        { orderItems: {
            some: {
              productId,
              orderId: { in: ordersIds }
            }
          }
        }
      ]
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const reviewOrNull = await prisma.review.findFirst({
    where: {
      AND: [
        { customerId },
        { productId }
      ]
    }
  });

  return {
    productId,
    lastOrdered: orderOrNull ? { 
      orderId: orderOrNull.id,
      orderDate: orderOrNull.createdAt
    } : null,
    review: reviewOrNull
  }
}