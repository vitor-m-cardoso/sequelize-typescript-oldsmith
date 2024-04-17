import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import productsService from '../services/products.service';

const createProduct = async (req: Request, res: Response) => {
  const { status, data } = await productsService.createProduct(req.body);

  return res.status(mapStatusHTTP(status)).json(data);
};

const listProducts = async (_req: Request, res: Response) => {
  const { status, data } = await productsService.listProducts();

  return res.status(mapStatusHTTP(status)).json(data);
};

export default {
  createProduct,
  listProducts,
};
