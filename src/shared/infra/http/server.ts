import 'reflect-metadata';
import 'dotenv/config';

import express, {Request, Response, NextFunction} from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

import '@shared/container';
import '@shared/infra/typeorm/index'


const app = express();
app.use(express.json());
app.use(cors());

app.use('/files',express.static(uploadConfig.uploadsFolder) );
app.use(routes);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {

  console.log('=========================================');
  console.log(err);
  if(err instanceof AppError){
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status:'error',
    message: 'Internal Server Error',
  });

  next();
});

app.listen(process.env.APP_PORT, () => {
  console.log(`servidor iniciado na porta ${process.env.APP_PORT}`);
});
