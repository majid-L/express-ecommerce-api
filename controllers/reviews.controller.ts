import { Request, Response, NextFunction } from 'express';
import formatNewReview from '../helpers/formatNewReview';
import prisma from "../prisma/prisma";

export const getReviews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { limit = 25, page = 1 } = req.query;
    const queryOptions = { where: {} };

    if (req.originalUrl.includes('products')) {
      queryOptions.where = { productId: req.productDetails.id }
    } else if (req.originalUrl.includes('customers')) {
      queryOptions.where = { customerId: req.customerDetails.id }
    }

    const [ totalResults, reviews ] = await prisma.$transaction([
      prisma.review.count(queryOptions),
      prisma.review.findMany({
        ...queryOptions,
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit)
      })
    ]);

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
    const newReview = await prisma.review.create({ data: formatNewReview(req.body) });
    res.status(201).send({ newReview });
  } catch (err) {
    next(err);
  }
}

export const updateReview = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ updatedReview: req.reviewDetails });
};

export const deleteReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedReview = await prisma.review.delete({ where: { id: req.reviewDetails.id } });
    res.status(200).send({deletedReview});
  } catch (err) {
    next(err);
  }
};