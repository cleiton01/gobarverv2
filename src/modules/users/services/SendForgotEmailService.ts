

import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

import User from '@modules/users/infra/typeorm/entities/User';
import {inject, injectable} from 'tsyringe';
import Error from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUserTokenRopository from '@modules/users/repositories/IUserTokenRopository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('SNSMail')
    private mailProvider: IMailProvider,
    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRopository,
  ){}

  public async execute ({email}: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if(!user){
      throw new Error('User does not exists');
    }

    await this.userTokenRepository.generate(user.id);

    this.mailProvider.sendMail(email,'teste');


    //return user;
  }
}

export default SendForgotEmailService;
