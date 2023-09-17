import { Prisma } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma/prisma';
import createError from '../helpers/createError';

const extendedOptions = {
  include: {
    customer: {
      select: { 
        username: true,
        avatar: true 
      }
    },
    product: { }
  }
};

const getModelData = async (url: string, id: number) => {
  let objectOrNull: ModelObject | null = null;
  const options = { where: { id } };

  if (url.includes('customers')) {
    objectOrNull = await prisma.customer.findUnique({
      ...options, 
      include: { 
        billingAddress: {},
        shippingAddress: {},
        oAuth: {}
      }
    });
  } else if (url.includes('products')) {
    objectOrNull = await prisma.product.findUnique(options);
  } else if (url.includes('reviews')) {
    objectOrNull = await prisma.review.findUnique({
      ...options,
      ...extendedOptions
    });
  }
  return objectOrNull
}

const attachModelDataToRequest = (req: Request, modelObject: ModelObject) => {
  if (req.originalUrl.includes('customers')) {
    req.customerDetails = modelObject as Prisma.CustomerGetPayload<{}>;
  } else if (req.originalUrl.includes('products')) {
    req.productDetails = modelObject as Prisma.ProductGetPayload<{}>;
  } else if (req.originalUrl.includes('reviews')) {
    req.reviewDetails = modelObject as Prisma.ReviewGetPayload<typeof extendedOptions>;
  }
}

const idParamHandler = async (req: Request, res: Response, next: NextFunction, id: string) => {
  try {
    if (isNaN(Number(id))) {
      return next(createError('Id must be a number.', 400));
    }

    const objectOrNull = await getModelData(req.originalUrl, Number(id));

    if (!objectOrNull) return next(createError('Not found.', 404));
    if (req.originalUrl.includes('customers') 
      && !/\/\d+\/reviews.*$/i.test(req.originalUrl)
      && req.session.passport!.user.id !== Number(id)) {
      return next(createError('Unauthorised.', 403));
    }
    
    attachModelDataToRequest(req, objectOrNull);
    next();
  } catch (err) {
    next(err);
  }
}

export default idParamHandler;