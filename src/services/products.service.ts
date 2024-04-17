import ProductModel, { ProductSequelizeModel } from '../database/models/product.model';
import { Product } from '../types/Product';
import { ServiceResponse } from '../types/ServiceResponse';

const createProduct = async (product: Product): Promise<ServiceResponse<Product>> => {
  const newProduct = await ProductModel.create(product);

  return { status: 'CREATED', data: newProduct.dataValues };
};

const listProducts = async (): Promise<ServiceResponse<ProductSequelizeModel[]>> => {
  const products = await ProductModel.findAll();

  return { status: 'SUCCESSFUL', data: products };
};

export default {
  createProduct,
  listProducts,
};
