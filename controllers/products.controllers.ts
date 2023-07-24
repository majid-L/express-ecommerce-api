import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma/prisma';

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { limit = 25, page = 1 } = req.query;
    const products = await prisma.product.findMany({
      orderBy: {
        id: 'asc',
      },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit)
    })
    res.send({products});
  } catch (err) {
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