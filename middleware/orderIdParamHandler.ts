import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma/prisma';
import createError from '../helpers/createError';

const orderIdParamHandler = async (req: Request, res: Response, next: NextFunction, id: string) => {
  try {
    let orderOrNull = await prisma.order.findUnique({
      where: { id: Number(id) }
    });

    if (!orderOrNull) return next(createError('Not found.', 404));
    if (orderOrNull.customerId !== req.customerDetails.id) {
      return next(createError('Unauthorised.', 403));
    }

    req.orderDetails = orderOrNull;
    next();
  } catch (err) {
    next(err);
  }
}

export default orderIdParamHandler;