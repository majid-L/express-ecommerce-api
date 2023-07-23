import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma/prisma';

const customerIdParamHandler = async (req: Request, res: Response, next: NextFunction, id: string) => {
  const customerOrNull = await prisma.customer.findUnique({ 
    where: { id: Number(id) }
  });
  if (!customerOrNull) {
    const err: Error = new Error ('Not found.');
    (err as Error & { status: number }).status = 404;
    next(err);
  } else if (req.session.passport?.user.id !== Number(id)) {
    const err: Error = new Error ('Unauthorised.');
    (err as Error & { status: number }).status = 403;
    next(err);
  } else {
    next();
  }
}

export default customerIdParamHandler;