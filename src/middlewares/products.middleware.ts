import { Request, Response, NextFunction } from 'express';
import UserModel from '../database/models/user.model';

const validateName = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  const minLength = 3;

  if (!name) return res.status(400).json({ message: '"name" is required' });
  if (typeof name !== 'string') return res.status(422).json({ message: '"name" must be a string' });
  if (name.length < minLength) {
    return res.status(422).json({ message: '"name" length must be at least 3 characters long' });
  }
  next();
};

const validatePrice = (req: Request, res: Response, next: NextFunction) => {
  const { price } = req.body;
  const minLength = 3;
  if (!price) return res.status(400).json({ message: '"price" is required' });
  if (typeof price !== 'string') {
    return res.status(422).json({ message: '"price" must be a string' });
  }
  if (price.length < minLength) {
    return res.status(422).json({ message: '"price" length must be at least 3 characters long' });
  }
  next();
};

const validateUserId = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.body;

  if (!userId) return res.status(400).json({ message: '"userId" is required' });
  if (typeof userId !== 'number') {
    return res.status(422).json({ message: '"userId" must be a number' });
  }

  const foundUser = await UserModel.findOne({ where: { id: userId } });

  if (!foundUser) {
    return res.status(422).json({ message: '"userId" not found' });
  }
  next();
};

export {
  validateName,
  validatePrice,
  validateUserId,
};
