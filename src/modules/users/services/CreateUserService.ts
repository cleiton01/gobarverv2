

import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

import User from '@modules/users/infra/typeorm/entities/User';
import {inject, injectable} from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,

  ){}

  public async execute ({name,password,email}: IRequest): Promise<User> {

    const checkIfUserExists = await this.usersRepository.findByEmail(email);

    if (checkIfUserExists){
      throw new AppError(
        String(process.env.USER_ALREADY_EXISTIS),
        Number(process.env.USER_ALREADY_EXISTIS_STATUS)
      );
    }

    const hashedPassword = await this.hashProvider.genarateHash(password);

    const user = await this.usersRepository.create({
      name,
      password: hashedPassword,
      email,
    });

    return user;
  }
}

export default CreateUserService;
