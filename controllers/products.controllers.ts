import { Request, Response, NextFunction } from 'express';
import { selectBestsellers, selectFavorites, selectProductById, selectProducts } from '../models/products.models';

export const getProducts = async (
  req: Request<{}, {}, {}, ProductsUrlParams>, 
  res: Response, 
  next: NextFunction
) => {
  try {
    const [ totalResults, resultSet ] = await selectProducts(req.query);
    res.send({
      page: Number(req.query.page || 1),
      count: resultSet.length,
      totalResults,
      products: resultSet.map((product: ProductWithOrderCount) => {
        product.numOfTimesOrdered = product._count!.orderItems;
        delete product._count;
        return product;
      })
    });
  } catch (err) {
    next(err);
  }  
}

export const getBestSellers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { limit = 25, page = 1, category = '', supplier = '' } = req.query;
    const [ rowCount, bestSellers ] = 
      await selectBestsellers(<string>category, <string>supplier, <string>page, <string>limit);
 
    res.send({ 
      page: Number(page),
      count: bestSellers.length,
      totalResults: rowCount[0].count,
      bestSellers
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