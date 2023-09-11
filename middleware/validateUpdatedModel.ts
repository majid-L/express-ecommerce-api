import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma/prisma';
import createError from '../helpers/createError';
import formatModelData from '../helpers/formatModelData';

const validateUpdatedModel = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const urlIncludesCustomer = req.originalUrl.includes('customer');
    const modelData = req.originalUrl.includes('customer') ? 'customerDetails' : 'reviewDetails';

    const updatedModelData = urlIncludesCustomer ? 
      await formatModelData<Customer>(
        'customer', req.body, req.customerDetails as Customer
      )
    : await formatModelData<Review>(
        'review', req.body, req.reviewDetails as Review
      );

    if ((updatedModelData as { error: string }).error) {
      return next(createError((updatedModelData as { error: string }).error, 400));
    }
    if (Object.keys(updatedModelData).length === 0) return next();

    const customerQueryOptions = () => ({
      where: { id : req[modelData].id },
      data: updatedModelData as Customer,
      include: {
        billingAddress: {},
        shippingAddress: {}
      }
    });

    const reviewQueryOptions = () => ({
      where: { id : req[modelData].id },
      data: updatedModelData as Review,
      include: {
        customer: {
          select: { 
            username: true,
            avatar: true 
          }
        },
        product: { }
      }
    });
    
    if (urlIncludesCustomer) {
      req.customerDetails = await prisma.customer.update(customerQueryOptions());
    } else {
      req.reviewDetails = await prisma.review.update(reviewQueryOptions());
    }
    next();
  } catch (err) {
    next(err);
  }
}

export default validateUpdatedModel;