
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

  public async execute({user_id }: IRequest): Promise<User[]>{

    const users = await this.usersRepository.findAllProviders({
      excep_user_id: user_id
    });

    return users;
  }
}

export default ShowProfileService;
