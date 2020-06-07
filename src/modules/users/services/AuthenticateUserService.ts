import { hash, compare } from 'bcrypt';
import User from '@modules/users/infra/typeorm/entities/User';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import {inject, injectable} from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse{
  user: User
  token: string;
}

@injectable()
class AuthenticateUserService{
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ){}

  public async execute({email, password}: IRequest):Promise<IResponse>{

    const user = await this.usersRepository.findByEmail(email);

    if(!user){

      throw new AppError(
        String(process.env.USER_PASS_INCORRECT),
        Number(process.env.USER_PASS_INCORRECT_STATUS)
      );
    }

    const passwordMatched = await this.hashProvider.compareHash(password, user.password);

    if(!passwordMatched){
      throw new AppError(
        String(process.env.USER_PASS_INCORRECT),
        Number(process.env.USER_PASS_INCORRECT_STATUS)
      );
    }

    const token = sign( {}, String(process.env.APP_SECRECT), {
      subject: user.id,
      expiresIn: '5d',
    });

    return {
      user,
      token
    }
  }
}

export default AuthenticateUserService;
