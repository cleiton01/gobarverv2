
import {inject, injectable} from 'tsyringe';

import Error from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import User from '@modules/users/infra/typeorm/entities/User';


interface IRequest {
  user_id: string;
}

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ){}

  public async execute({user_id }: IRequest): Promise<User>{

    const user = await this.usersRepository.findById(user_id);

    if(!user){
      throw new Error(
        String(process.env.AUTH_INVALID_ACESS),
        Number(process.env.AUTH_INVALID_ACESS_STATUS)
      );
    }

    return user;
  }
}

export default ShowProfileService;
