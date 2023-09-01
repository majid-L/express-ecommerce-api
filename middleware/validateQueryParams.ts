import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma/prisma';

const escapePunctuation = (str: string) => {
  let result = "";
  for (const letter of str) {
    if (/^[a-zA-Z0-9]+$/.test(letter)) {
      result += letter;
    } else {
      result += " ";
    }
  }
  return result;
}

export const validateQueryParams = async (req: Request<{}, {}, {}, ProductsUrlParams>, res: Response, next: NextFunction) => {
  try {
    const numericParams: (keyof ProductsUrlParams)[] = ["page", "limit", "minPrice", "maxPrice", "avgRating"];
    const validatedParams: ProductsUrlParams = { 
      limit: 25, 
      page: 1,
      minPrice: 0,
      maxPrice: 1e5,
      category: "",
      supplier: "",
      product: "",
      hideOutOfStock: "false",
      orderBy: "id",
      order: "ASC",
      avgRating: 0
    };
  
    const updateParam = <Key extends keyof ProductsUrlParams>(param: Key, value: ProductsUrlParams[Key]) => {
      validatedParams[param] = value;
    }
  
    numericParams.forEach(key => {
      const param = Number(req.query[key]);
      switch (key) {
        case "page":
        case "limit":
          if (!isNaN(param) && param % 1 === 0 && param > 0) {
            updateParam(key, param);
          }
          break;
  
        default:
          if (!isNaN(param) && param >= 0) {
            updateParam(key, param);
          }
          break;
      }
    });

    const categories = await prisma.category.findMany();
    if (categories.map(category => category.name).includes(req.query.category)) {
      updateParam("category", req.query.category);
    }

    const suppliers = await prisma.supplier.findMany();
    if (suppliers.map(supplier => supplier.name).includes(req.query.supplier)) {
      updateParam("supplier", req.query.supplier);
    }

    if (req.query.product) {
      updateParam("product", escapePunctuation(req.query.product));
    }

    if (["id", "name", "description", "price", "avgRating", "bestsellers", "stock", "categoryName", "supplierName", "thumbnail"].includes(req.query.orderBy)) {
      updateParam("orderBy", req.query.orderBy);
    }

    if (/^asc|desc$/i.test(req.query.order)) {
      updateParam("order", req.query.order);
    }

    if (["true", "false"].includes(req.query.hideOutOfStock)) {
      updateParam("hideOutOfStock", req.query.hideOutOfStock);
    }

    req.productQueryParams = validatedParams;
    next();
  } catch(err) {
    next(err);
  }
}