import { expect } from 'chai';
import sinon from 'sinon';
import productMock from '../../mocks/product.mock';
import productsService from '../../../src/services/products.service';
import ProductModel from '../../../src/database/models/product.model';

describe('ProductsService', function () {
  beforeEach(function () { sinon.restore(); });

  it('Deve retornar corretamente caso o produto seja cadastrado com sucesso', async function () {
    const parameters = productMock.newProductBody;

    const mockCreateOne = ProductModel.build(productMock.createdProductFromDB);
    sinon.stub(ProductModel, 'create').resolves(mockCreateOne);

    const serviceResponse = await productsService.createProduct({ id: 6, ...parameters });

    const newProduct = {
      id: 6,
      name: 'Martelo do martelo',
      price: 'mil reais',
      userId: 1,
    }

    expect(serviceResponse.status).to.be.equal('CREATED');
    expect(serviceResponse.data).to.be.deep.equal(newProduct);
  });

  it('Deve retornar corretamente os dados ao listar os produtos', async function () {
    const products = [
      ProductModel.build({ id: 1, name: 'Excalibur', price: '10 peças de ouro', userId: 1 }),
      ProductModel.build({ id: 2, name: 'Espada Justiceira', price: '20 peças de ouro', userId: 1 }),
    ];
    sinon.stub(ProductModel, 'findAll').resolves(products);

    const serviceResponse = await productsService.listProducts();

    expect(serviceResponse.status).to.be.equal('SUCCESSFUL');
    expect(serviceResponse.data).to.be.deep.equal(products);
  });
});
