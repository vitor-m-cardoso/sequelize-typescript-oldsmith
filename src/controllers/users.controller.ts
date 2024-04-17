import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import usersService from '../services/users.service';

const listUsers = async (_req: Request, res: Response) => {
  const { status, data } = await usersService.listUsers();

  return res.status(mapStatusHTTP(status)).json(data);
};

export default {
  listUsers,
};
