import { Request, Response, NextFunction } from 'express';

export const handleError = (err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status((err as Error & { status: number }).status || 500).send({msg: err.message});
}