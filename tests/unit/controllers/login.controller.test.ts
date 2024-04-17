import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import loginService from '../../../src/services/login.service';
import loginController from '../../../src/controllers/login.controller';
import { ServiceResponse } from '../../../src/types/ServiceResponse';
import { Token } from '../../../src/types/Token';

chai.use(sinonChai);

describe('LoginController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Deve retornar um token ao fazer login com sucesso', async function () {
    req.body = { username: 'Hagar', password: 'terrível' };
    const token = { token: 'tokenFuncional' }
    const serviceResponse: ServiceResponse<Token> = {
      status: 'SUCCESSFUL',
      data: token,
    }

    sinon.stub(loginService, 'validateLogin').resolves(serviceResponse);

    await loginController.login(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(token);
  });

  it('Deve retornar um erro não caso receba o "username"', async function () {
    req.body = { username: '', password: 'terrível' };
    const message = { message: '"username and "password" are required"' };
    const serviceResponse: ServiceResponse<Token> = {
      status: 'INVALID_DATA',
      data: message,
    }

    sinon.stub(loginService, 'validateLogin').resolves(serviceResponse);

    await loginController.login(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith(message);
  });

  it('Deve retornar um erro não caso receba o "password"', async function () {
    req.body = { username: 'Hagar', password: '' };
    const message = { message: '"username and "password" are required"' };
    const serviceResponse: ServiceResponse<Token> = {
      status: 'INVALID_DATA',
      data: message,
    }

    sinon.stub(loginService, 'validateLogin').resolves(serviceResponse);

    await loginController.login(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith(message);
  });

  it('Deve retornar um erro caso receba um "username" inválido', async function () {
    req.body = { username: 'Yogar', password: 'gentil' };
    const message = { message: '"Username or password invalid"' };
    const serviceResponse: ServiceResponse<Token> = {
      status: 'UNAUTHORIZED',
      data: message,
    }

    sinon.stub(loginService, 'validateLogin').resolves(serviceResponse);

    await loginController.login(req, res);

    expect(res.status).to.have.been.calledWith(401);
    expect(res.json).to.have.been.calledWith(message);
  });

  it('Deve retornar um erro caso receba um "password" incorreto', async function () {
    req.body = { username: 'Hagar', password: 'gentil' };
    const message = { message: '"Username or password invalid"' };
    const serviceResponse: ServiceResponse<Token> = {
      status: 'UNAUTHORIZED',
      data: message,
    }

    sinon.stub(loginService, 'validateLogin').resolves(serviceResponse);

    await loginController.login(req, res);

    expect(res.status).to.have.been.calledWith(401);
    expect(res.json).to.have.been.calledWith(message);
  });
});
