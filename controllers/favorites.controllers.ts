import { Request, Response, NextFunction } from 'express';
import { selectFavorites } from '../models/products.models';

const getFavorites = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { limit = 25, page = 1 } = req.query;
    const favorites = await selectFavorites(Number(page), Number(limit), req.customerDetails.id);
    res.status(200).send({ favorites });
  } catch (err) {
    next(err);
  }
}

export default getFavorites;