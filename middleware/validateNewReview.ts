import { Request, Response, NextFunction } from 'express';
import createError from '../helpers/createError';
import prisma from '../prisma/prisma';

const validateNewReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { customerId, productId, rating, title, body } = req.body;

    // 1) Ensure the new review object has all the required properties
    const requiredFields = ['customerId', 'productId', 'title', 'body', 'rating'];
    const requestBodyIsValid = requiredFields
      .every((field: string) => {
        return Object.keys((req.body as Review)).includes(field);
      });
    if (!requestBodyIsValid) {
      return next(createError('Request body is missing required field(s).', 400));
    }

    // 2) Ensure no blank values
    if (/^\s*$/.test(title) || /^\s*$/.test(body)) {
      return next(createError('Field(s) cannot be empty or blank.', 400));
    }

    // 3) Ensure rating is between 0 and 5
    if (typeof rating !== 'number' || rating < 0 || rating > 5) {
      return next(createError('Rating must be a whole number between 0 and 5.', 400));
    }

    // 4) Ensure customer id is correct
    if (req.session.passport!.user.id !== customerId) {
      return next(createError('Customer id must match current authenticated user.', 400));
    }

    // 5) Only allow a customer to review an item they've ordered
    const [ { count } ] = await prisma.$queryRaw<[{ count: number }]>`
      SELECT COUNT(*)::INTEGER
      FROM "Order" o, "OrderItem" oi
      WHERE o."id" = oi."orderId"
      AND oi."productId" = ${productId}
      AND o."customerId" = ${customerId}
    `;
    if (count === 0) {
      return next(createError('Cannot post a review for an item that has not been purchased by this customer.', 400));
    }

    // 6) Prevent multiple reviews on the same product by the same customer
    const reviewOrNull = await prisma.review.findFirst({
      where : {
        customerId: customerId,
        productId: productId
      }
    });
    if (reviewOrNull) {
      return next(createError('Cannot post multiple reviews for the same product.', 400));
    }
    next();
  } catch (err) {
    next(err);
  }
}

export default validateNewReview;