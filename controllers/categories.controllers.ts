import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import prisma from '../prisma/prisma';

const formatResponse = (arr: 
  Prisma.CategoryGetPayload<QueryOptions>[] | Prisma.SupplierGetPayload<QueryOptions>[]) => {
  return (arr as Category[] | Supplier[]).map((item) => {
    item.products = item._count!.products;
    delete item._count;
    return item;
  })
}

const getCategoriesOrSuppliers = async (req: Request, res: Response, next: NextFunction) => {
  const queryOptions = {
    include: {
      _count: {
        select: { products: true }
      }
    }
  };

  let response: CategoriesOrSuppliers;

  try {
    if (req.url.split('/')[1] === 'categories') {
      response = { 
        categories: formatResponse(
          await prisma.category.findMany(queryOptions)
        ) as Category[] };
    } else {
      response = { 
        suppliers: formatResponse(
          await prisma.supplier.findMany(queryOptions)
        ) as Supplier[] };
    }
    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
}

export default getCategoriesOrSuppliers;