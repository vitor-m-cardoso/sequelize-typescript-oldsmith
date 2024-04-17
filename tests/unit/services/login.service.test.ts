import bcrypt from 'bcryptjs';
import { expect } from 'chai';
import sinon from 'sinon';
import loginService from '../../../src/services/login.service';
import UserModel from '../../../src/database/models/user.model';

describe('LoginService', function () {
  beforeEach(function () { sinon.restore(); });
  const SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS || 10;

  it('Deve retornar um token ao receber um email e senha válidos', async function () {
    const existingUser = {
      username: 'Hagar',
      password: bcrypt.hashSync('terrível', SALT_ROUNDS),
      vocation: 'Bear',
      level: 100
    };
    const parameters = { username: 'Hagar', password: 'terrível' };
    const mockFindOneReturn = UserModel.build(existingUser);
    sinon.stub(UserModel, 'findOne').resolves(mockFindOneReturn);

    const serviceResponse = await loginService.validateLogin(parameters);
    console.log(serviceResponse);
    expect(serviceResponse.status).to.be.equal('SUCCESSFUL');
    expect(serviceResponse.data).to.have.key('token');
  });

  it('Deve retornar um erro caso não receba o "username"', async function () {
    const parameters = { username: '', password: 'passw3123' };

    const serviceResponse = await loginService.validateLogin(parameters);

    expect(serviceResponse.status).to.be.equal('INVALID_DATA');
    expect(serviceResponse.data).not.to.have.key('token');
    expect(serviceResponse.data).to.be.deep.equal({ message: '"username" and "password" are required' });
  });

  it('Deve retornar um erro caso não receba o "password"', async function () {
    const parameters = { username: 'User 1', password: '' };

    const serviceResponse = await loginService.validateLogin(parameters);

    expect(serviceResponse.status).to.be.equal('INVALID_DATA');
    expect(serviceResponse.data).not.to.have.key('token');
    expect(serviceResponse.data).to.be.deep.equal({ message: '"username" and "password" are required' });
  });

  it('Deve retornar um erro caso receba um "username" inexistente', async function () {
    const parameters = { username: 'TeddyTalks', password: 'T3ddyt4lk5' };
    sinon.stub(UserModel, 'findOne').resolves(null);

    const serviceResponse = await loginService.validateLogin(parameters);

    expect(serviceResponse.status).to.be.equal('UNAUTHORIZED');
    expect(serviceResponse.data).not.to.have.key('token');
    expect(serviceResponse.data).to.be.deep.equal({ message: 'Username or password invalid' });
  });

  it('Deve retornar um erro ao receber um "username" válido e um "password" inválido', async function () {
    const parameters = { username: 'Teddy', password: 'h4ckp4ssw0rd' };
    const existingUser = { username: 'Teddy', password: 't3ddyb34r', vocation: 'Bear', level: 100 };
    const mockFindOneReturn = UserModel.build(existingUser);
    sinon.stub(UserModel, 'findOne').resolves(mockFindOneReturn);

    const serviceResponse = await loginService.validateLogin(parameters);

    expect(serviceResponse.status).to.be.equal('UNAUTHORIZED');
    expect(serviceResponse.data).not.to.have.key('token');
    expect(serviceResponse.data).to.be.deep.equal({ message: 'Username or password invalid' });
  });
});
