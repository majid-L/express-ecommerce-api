import { Prisma } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma/prisma';
import createError from '../helpers/createError';

const idParamHandler = async (req: Request, res: Response, next: NextFunction, id: string) => {
  try {
    const paramIsCustomerId = req.originalUrl.includes('customers');
    const paramIsProductId = req.originalUrl.includes('products');
    const paramIsReviewId = req.originalUrl.includes('reviews');

    if (isNaN(Number(id))) {
      return next(createError('Id must be a number.', 400));
    }

    // objectOrNull is either a customer object, a product object, a review object, or NULL
    let objectOrNull: ModelObject | null = null;
    const options = { where: { id: Number(id) } };

    if (paramIsCustomerId) {
      objectOrNull = await prisma.customer.findUnique(options);
    } else if (paramIsProductId) {
      objectOrNull = await prisma.product.findUnique(options);
    } else if (paramIsReviewId) {
      objectOrNull = await prisma.review.findUnique(options);
    }

    /* Depending on the query result, send an appropriate error 
    response or attach the model object to the request object */
    if (!objectOrNull) return next(createError('Not found.', 404));
    if (paramIsCustomerId && req.session.passport!.user.id !== Number(id)) {
      return next(createError('Unauthorised.', 403));
    }

    if (paramIsCustomerId) {
      req.customerDetails = objectOrNull as Prisma.CustomerGetPayload<{}>;
    } else if (paramIsProductId) {
      req.productDetails = objectOrNull as Prisma.ProductGetPayload<{}>;
    } else if (paramIsReviewId) {
      req.reviewDetails = objectOrNull as Prisma.ReviewGetPayload<{}>;
    }

    next();
  } catch (err) {
    next(err);
  }
}

export default idParamHandler;