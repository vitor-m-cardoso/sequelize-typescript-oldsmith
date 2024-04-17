import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import loginService from '../services/login.service';

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const { status, data } = await loginService.validateLogin({ username, password });

  if (status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(status)).json(data);
  }

  return res.status(mapStatusHTTP(status)).json(data);
};

export default {
  login,
};
