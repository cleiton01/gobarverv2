

import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

import User from '@modules/users/infra/typeorm/entities/User';
import {inject, injectable} from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  email: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ){}

  public async execute ({email}: IRequest): Promise<void> {
    const checkIfUserExists = await this.usersRepository.findByEmail(email);

    if (checkIfUserExists){
      throw new AppError(
        String(process.env.USER_ALREADY_EXISTIS),
        Number(process.env.USER_ALREADY_EXISTIS_STATUS)
      );
    }

    //return user;
  }
}

export default CreateUserService;
