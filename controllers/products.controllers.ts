import { Request, Response, NextFunction } from 'express';
import createError from '../helpers/createError';
import { selectFavorites, selectProductById, selectProducts, updateProduct } from '../models/products.models';

export const getProducts = async (
  req: Request<{}, {}, {}, ProductsUrlParams>, 
  res: Response, 
  next: NextFunction) => {
  try {
    const [ rowCount, resultSet ] = await selectProducts(req.productQueryParams);
    res.send({ 
      page: req.productQueryParams.page,
      count: resultSet.length,
      totalResults: rowCount[0].count,
      products: resultSet
    });
  } catch (err) {
    next(err);
  }
}

export const getFavorites = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { limit = 25, page = 1 } = req.query;
    const favorites = await selectFavorites(Number(page), Number(limit), req.customerDetails.id);
    res.status(200).send(favorites);
  } catch (err) {
    next(err);
  }
}

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [
      { 
        _avg: { rating: averageRating },
        _count: { rating: totalRatings }
      },
      { 
        _count: { orderItems: numOfTimesOrdered }
      }
    ] = await selectProductById(req.productDetails.id) as PrismaAggregateTransaction;
    
    res.status(200).send({ 
      ...req.productDetails, 
      averageRating: averageRating?.toFixed(1),
      totalRatings,
      numOfTimesOrdered
    });
    
  } catch (err) {
    next(err);
  }
}

export const updateProductStock = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stock = Number(req.body.stock);
    if (isNaN(stock) || stock < 0) {
      return next(createError("Invalid stock amount.", 400));
    }
    const updatedProduct = await updateProduct(req.productDetails.id, stock);
    res.status(200).send({ updatedProduct });
  } catch(err) {
    next(err);
  }
}