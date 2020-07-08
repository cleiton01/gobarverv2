

import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

import User from '@modules/users/infra/typeorm/entities/User';
import {inject, injectable} from 'tsyringe';
import Error from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

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
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,

  ){}

  public async execute ({name,password,email}: IRequest): Promise<User> {

    const checkIfUserExists = await this.usersRepository.findByEmail(email);

    if (checkIfUserExists){
      throw new Error('User already exists');
    }

    const hashedPassword = await this.hashProvider.genarateHash(password);

    const user = await this.usersRepository.create({
      name,
      password: hashedPassword,
      email,
    });

    await this.cacheProvider.invalidatePrefix('providers-list')
    return user;
  }
}

export default CreateUserService;
