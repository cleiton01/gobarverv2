
import {inject, injectable} from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import User from '@modules/users/infra/typeorm/entities/User';


interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?:string;
  password?:string;

}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ){}

  public async execute({user_id, name, email }: IRequest): Promise<User>{

    const user = await this.usersRepository.findById(user_id);

    if(!user){
      throw new AppError(
        String(process.env.AUTH_INVALID_ACESS),
        Number(process.env.AUTH_INVALID_ACESS_STATUS)
      );
    }

    return user;
  }
}

export default UpdateProfileService;
