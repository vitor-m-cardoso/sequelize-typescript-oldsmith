import sequelize from '../database/models/index';
import ProductModel from '../database/models/product.model';
import UserModel, { UserSequelizeModel } from '../database/models/user.model';
import { ServiceResponse } from '../types/ServiceResponse';

const listUsers = async (): Promise<ServiceResponse<UserSequelizeModel[]>> => {
  const usersFromModel = await UserModel.findAll({
    attributes: [
      'id',
      'username',
      [sequelize.fn('JSON_ARRAYAGG', sequelize.col('productIds.id')), 'productIds'],
    ],
    include: [{
      model: ProductModel,
      attributes: [],
      as: 'productIds',
    }],
    group: ['User.id'],
    raw: true,
  });
  
  return { status: 'SUCCESSFUL', data: usersFromModel };
};

export default {
  listUsers,
};
