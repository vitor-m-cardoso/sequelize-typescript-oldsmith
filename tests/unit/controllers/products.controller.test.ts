import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import productMock from '../../mocks/product.mock';
import productsService from '../../../src/services/products.service';
import productsController from '../../../src/controllers/products.controller';
import { ServiceResponse } from '../../../src/types/ServiceResponse';
import { Product } from '../../../src/types/Product';
import ProductModel, { ProductSequelizeModel } from '../../../src/database/models/product.model';

chai.use(sinonChai);

describe('ProductsController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Deve cadastrar um produto com sucesso', async function () {
    req.body = productMock.newProductBody;

    const serviceResponse: ServiceResponse<Product> = {
      status: 'CREATED',
      data: productMock.createdProductFromService,
    };
    sinon.stub(productsService, 'createProduct').resolves(serviceResponse);

    const newProduct = {
      id: 6,
      name: 'Martelo do martelo',
      price: 'mil reais',
      userId: 1,
    };

    await productsController.createProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newProduct);
  });

  it('Deve listar todos os produtos corretamente', async function () {
    const products = [
      ProductModel.build({ id: 1, name: 'Excalibur', price: '10 peças de ouro', userId: 1 }),
      ProductModel.build({ id: 2, name: 'Espada Justiceira', price: '20 peças de ouro', userId: 1 }),
    ];

    const serviceResponse: ServiceResponse<ProductSequelizeModel[]> = {
      status: 'SUCCESSFUL',
      data: products,
    };

    sinon.stub(productsService, 'listProducts').resolves(serviceResponse);

    await productsController.listProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(products);
  });
});
