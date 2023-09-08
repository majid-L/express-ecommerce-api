import { Request, Response, NextFunction } from 'express';
import formatNewReview from '../helpers/formatNewReview';
import { selectReviews } from '../models/reviews.models';
import prisma from "../prisma/prisma";

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

export const getReviews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { limit = 25, page = 1, orderBy = 'createdAt' } = req.query;

    let where: { productId?: number, customerId?: number };
    if (req.originalUrl.includes('products')) {
      where = { productId: req.productDetails.id }
    } else if (req.originalUrl.includes('customers')) {
      where = { customerId: req.customerDetails.id }
    }

    const [ totalResults, reviews ] = 
      await selectReviews(where!, Number(page), Number(limit), orderBy as string);

    res.status(200).send({
      page: Number(page),
      count: reviews.length,
      totalResults,
      reviews
    });
  } catch (err) {
    next(err);
  }
};

export const getReviewById = (req: Request, res: Response) => {
  res.status(200).send(req.reviewDetails);
};

export const createReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newReview = await prisma.review.create({ 
      data: formatNewReview(req.body),
      ...extendedOptions
    });
    res.status(201).send({ newReview });
  } catch (err) {
    next(err);
  }
}

export const updateReview = (req: Request, res: Response) => {
  res.status(200).send({ updatedReview: req.reviewDetails });
};

export const deleteReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedReview = await prisma.review.delete({ 
      where: { id: req.reviewDetails.id },
      ...extendedOptions
    });
    res.status(200).send({ deletedReview });
  } catch (err) {
    next(err);
  }
};