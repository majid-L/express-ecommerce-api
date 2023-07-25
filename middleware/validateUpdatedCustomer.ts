import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma/prisma';
import bcrypt from 'bcrypt';

type AcceptedField = 'name' | 'username' | 'password' | 'email' | 'billingAddress' | 'shippingAddress' | 'avatar';

const validateUpdatedCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const acceptedFields = ['name', 'username', 'password', 'email', 'billingAddress', 'shippingAddress', 'avatar'];

    const updatedCustomer: Customer | Record<string, string> = {};
    
    for (const field in req.body) {
      const valueIsDifferent = req.body[field] !== req.customerDetails[field as AcceptedField];
      if (acceptedFields.includes(field) && valueIsDifferent) {
        if (/^\s*$/.test(req.body[field])) {
          const err: MiddlewareError = new Error('Field cannot be empty or blank.');
          err.status = 400;
          return next(err);
        }
        updatedCustomer[field] = req.body[field];
      }
      if (field === 'password') {
        const salt = await bcrypt.genSalt(10);
        updatedCustomer.password = await bcrypt.hash(req.body.password, salt);
      }
    }
  
    if (Object.keys(updatedCustomer).length === 0) {
      return next();
    }

    const customerDetails = await prisma.customer.update({
      where: { id : req.customerDetails.id },
      data: updatedCustomer
    });
    req.customerDetails = customerDetails;
    next();
  } catch (err) {
    next(err);
  }
}

export default validateUpdatedCustomer;