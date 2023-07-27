import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma/prisma';
import bcrypt from 'bcrypt';
import createError from '../helpers/createError';

const formatModelData = async <ModelType>(
  resource: string, 
  requestBody: Partial<ModelType>, 
  existingModel: ModelType) => {

    const acceptedFields = resource === 'customer' ?
    ['name', 'username', 'password', 'email', 'billingAddress', 'shippingAddress', 'avatar']
    : ['title', 'body', 'rating', 'recommend'];

    const updatedModelData: Partial<ModelType> = {};
    for (const field in requestBody) {
      const valueIsDifferent = requestBody[field] !== existingModel[field];
      if (acceptedFields.includes(field) && valueIsDifferent) {
        if (/^\s*$/.test(requestBody[field] as string)) {
          return 'Field(s) cannot be empty or blank.';
        }
        updatedModelData[field] = requestBody[field];
      }
      if (field === 'password') {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash((requestBody as unknown as Customer).password, salt);
        (updatedModelData as Partial<Customer>).password = hashedPassword;
      }
      if (field === 'rating') {
        if (![0, 1, 2, 3, 4, 5].includes((requestBody as unknown as Review).rating)) {
          return 'Rating must be a whole number between 0 and 5.';
        }
      }
    }
    return updatedModelData;
}

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

    if (typeof updatedModelData === 'string') {
      return next(createError(updatedModelData, 400));
    }
    if (Object.keys(updatedModelData).length === 0) return next();

    const queryOptions = {
      where: { id : req[modelData].id },
      data: updatedModelData
    };

    if (urlIncludesCustomer) {
      req.customerDetails = await prisma.customer.update(queryOptions);
    } else {
      req.reviewDetails = await prisma.review.update(queryOptions);
    }
    next();
  } catch (err) {
    next(err);
  }
}

export default validateUpdatedModel;