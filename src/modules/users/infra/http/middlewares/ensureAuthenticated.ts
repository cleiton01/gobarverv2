import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface TokenPayload{
  iat:number;
  exp:number;
  sub: string;
}

export default function ensureAuthenticated(
  request:Request,
  response:Response,
  next:NextFunction
): void{

  const authHeader = request.headers.authorization;

  if(!authHeader){
    throw new AppError(
      String(process.env.AUTH_MISS_TOKEN),
      Number(process.env.AUTH_MISS_TOKEN_STATUS)
    );
  }
  // separa identificador "bearer" do token
  const [,token] = authHeader.split(' ');

  try{
    const decoded = verify(token, String(process.env.APP_SECRECT));
    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub
    }
  }catch(err){
    throw new AppError(
      String(process.env.AUTH_INVALID_TOKEN),
      Number(process.env.AUTH_INVALID_TOKEN_STATUS)
    );
  }
  return next();
}
