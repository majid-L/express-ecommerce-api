import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma/prisma';
import { Product } from '@prisma/client';

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { 
      limit = 25, 
      page = 1,
      minPrice = 0,
      maxPrice = 1e5,
      category,
      supplier,
      hideOutOfStock = false,
      sortBy = 'id',
      order = 'asc'
    } = req.query;

    // Define the sort/filter/aggregate options to be applied to the query
    const numberOfOrders = {
      include: { _count: { select: { orderItems: true } } }
    }

    const queryOptions = {
      where: {
        AND: [ 
          { NOT: {} },
          {
            price: { 
              gte: Number(minPrice),
              lte: Number(maxPrice)
            }
          },
          { categoryName: {} },
          { supplierName: {} }
        ]
      },
      orderBy: {
        [sortBy as string]: order,
      }
    };

    // Conditionally attach filters to query options
    if (hideOutOfStock) queryOptions.where.AND[0].NOT = { stock: 0 };
    if (category) queryOptions.where.AND[2].categoryName = { 
      contains: category,
      mode: 'insensitive'
     };
    if (supplier) queryOptions.where.AND[3].supplierName = { 
      contains: supplier,
      mode: 'insensitive'
    };

    // Get the list of filtered/sorted products
    const resultSet = await prisma.$transaction([
      prisma.product.count(queryOptions),
      prisma.product.findMany({
        ...queryOptions,
        ...numberOfOrders,
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit),
        })
    ]);

    // format the properties on the JSON response
    res.send({
      page: Number(page),
      count: resultSet[1].length,
      totalResults: resultSet[0],
      products: resultSet[1].map((product: ProductWithOrderCount) => {
        product.numOfTimesOrdered = product._count!.orderItems;
        delete product._count;
        return product;
      })
    });
  } catch (err) {
    next(err);
  }  
}

export const getBestSellers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { limit = 25, page = 1 } = req.query;
    const [ totalResults, bestSellers ] = await prisma.$transaction([
      prisma.product.count(),
      prisma.$queryRaw<(Product & ProductExtended)[]>`
        SELECT 
          p."id", 
          COUNT(oi."orderId")::INTEGER AS "numOfTimesOrdered",
          SUM(oi."quantity")::INTEGER AS "totalUnitsOrdered",
          p."name",
          p."description", 
          p."price",
          p."stock", 
          p."categoryName", 
          p."supplierName", 
          p."thumbnail"
        FROM "Product" p
        JOIN "OrderItem" oi
        ON p."id" = oi."productId"
        GROUP BY 1
        ORDER BY 2 DESC
        LIMIT ${Number(limit)}
        OFFSET ${(Number(page) - 1) * Number(limit)}
      `
    ]);
 
    res.send({ 
      page: Number(page),
      count: bestSellers.length,
      totalResults,
      bestSellers
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productOrNull = await prisma.product.findUnique({
      where: { id: Number(req.params.productId) }
    });
    if (productOrNull) {
      res.status(200).send(productOrNull);
    } else {
      const err: Error = new Error ('Not found.');
      (err as Error & { status: number }).status = 400;
      next(err);
    }
  } catch (err) {
    next(err);
  }
}