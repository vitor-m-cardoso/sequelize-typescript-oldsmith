import { Router } from 'express';
import usersController from '../controllers/users.controller';

const router = Router();

router.get('/', usersController.listUsers);

export default router;
