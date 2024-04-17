import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import UserModel, { UserSequelizeModel } from '../../../src/database/models/user.model';
import { ServiceResponse } from '../../../src/types/ServiceResponse';
import usersService from '../../../src/services/users.service';
import usersController from '../../../src/controllers/users.controller';

chai.use(sinonChai);

describe('UsersController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Deve listar todos os produtos corretamente', async function () {
    const users = [
      UserModel.build({ id: 1, username: 'Hagar', vocation: 'Guerreiro', level: 10, password: 'terrível' }),
      UserModel.build({ id: 2, username: 'Eddie', vocation: 'Berserker', level: 9, password: 'terrível' }),
    ];

    const serviceResponse: ServiceResponse<UserSequelizeModel[]> = {
      status: 'SUCCESSFUL',
      data: users,
    };

    sinon.stub(usersService, 'listUsers').resolves(serviceResponse);

    await usersController.listUsers(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(users);
  });
});
