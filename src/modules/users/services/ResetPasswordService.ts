import {inject, injectable} from 'tsyringe';
import {isAfter, addHours} from 'date-fns'
import User from '@modules/users/infra/typeorm/entities/User';
import Error from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import IUserTokenRopository from '@modules/users/repositories/IUserTokenRopository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

interface IRequest {
  password: string;
  token: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRopository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ){}

  public async execute ({token, password}: IRequest): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token);

    if(!userToken){
      throw new Error('Token does not exists');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if(!user){
      throw new Error('User does not exists');
    }

    const tokenCreatedAt = userToken.created_at;

    const compareDate = addHours(tokenCreatedAt, 2);
    if (isAfter(Date.now(),compareDate)){
      throw new Error('User token does not exists');
    }

    user.password = await this.hashProvider.genarateHash(password);

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
