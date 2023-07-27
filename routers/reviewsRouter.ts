import { Router } from 'express';
import { createReview, deleteReview, getReviewById, getReviews, updateReview } from '../controllers/reviews.controller';
import idParamHandler from '../middleware/idParamHandler';
import { userIsAuthenticated, userIsAuthorised } from '../middleware/validateAuth';
import validateNewReview from '../middleware/validateNewReview';
import validateUpdatedModel from '../middleware/validateUpdatedModel';

const reviewsRouter = Router();
reviewsRouter.param('reviewId', idParamHandler);

reviewsRouter
.route('/')
.get(getReviews)
.post(userIsAuthenticated, validateNewReview, createReview);

reviewsRouter
.route('/:reviewId')
.get(getReviewById)
.put(userIsAuthenticated, userIsAuthorised, validateUpdatedModel, updateReview)
.delete(userIsAuthenticated, userIsAuthorised, deleteReview);

export default reviewsRouter;