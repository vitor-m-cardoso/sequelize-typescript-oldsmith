import express from 'express';
import productsRouter from './routes/products.router';
import usersRouter from './routes/users.router';
import loginRouter from './routes/login.router';

const app = express();

app.use(express.json());

app.use('/login', loginRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

export default app;
