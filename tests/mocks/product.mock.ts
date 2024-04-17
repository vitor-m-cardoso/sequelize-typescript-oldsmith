import { ProductInputtableTypes } from "../../src/database/models/product.model";
import { Product } from "../../src/types/Product";

const newProductBody = {
  name: 'Martelo do martelo',
  price: 'mil reais',
  userId: 1,
};
const createdProductFromService = {
  id: 6,
  name: 'Martelo do martelo',
  price: 'mil reais',
  userId: 1,
};
const createdProductFromDB = {
  id: 6,
  name: 'Martelo do martelo',
  price: 'mil reais',
  userId: 1,
};

const productWithoutName = {
  price: 'mil reais',
  userId: 1,
};

export default {
  newProductBody,
  createdProductFromService,
  createdProductFromDB,
  productWithoutName,
};
