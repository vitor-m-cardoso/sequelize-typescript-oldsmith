import { expect } from 'chai';
import sinon from 'sinon';
import UserModel from '../../../src/database/models/user.model';
import usersService from '../../../src/services/users.service';

describe('UsersService', function () {
  beforeEach(function () { sinon.restore(); });

  it('Deve retornar corretamente os dados ao listar os usuários', async function () {
    const users = [
      UserModel.build({ id: 1, username: 'Hagar', vocation: 'Guerreiro', level: 10, password: 'terrível' }),
      UserModel.build({ id: 2, username: 'Eddie', vocation: 'Berserker', level: 9, password: 'terrível' }),
    ];
    sinon.stub(UserModel, 'findAll').resolves(users);

    const serviceResponse = await usersService.listUsers();

    expect(serviceResponse.status).to.be.equal('SUCCESSFUL');
    expect(serviceResponse.data).to.be.deep.equal(users);
  });
});
