import bcrypt from 'bcryptjs';
import UserModel from '../database/models/user.model';
import { Login } from '../types/Login';
import { ServiceResponse } from '../types/ServiceResponse';
import { Token } from '../types/Token';
import * as jwt from '../utils/jwt';

const validateLogin = async ({ username, password }: Login): Promise<ServiceResponse<Token>> => {
  if (!username || !password) {
    return { status: 'INVALID_DATA', data: { message: '"username" and "password" are required' } };
  }

  const foundUser = await UserModel.findOne({ where: { username } });
  
  if (!foundUser || !bcrypt.compareSync(password, foundUser.dataValues.password)) {
    return { status: 'UNAUTHORIZED', data: { message: 'Username or password invalid' } };
  }

  const token = jwt.sign({ username, id: foundUser.dataValues.id });

  return { status: 'SUCCESSFUL', data: { token } };
};

export default {
  validateLogin,
};
