

import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import path from 'path';
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
    @inject('MailProvider')
    private mailProvider: IMailProvider,
    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRopository,
  ){}

  public async execute ({email}: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if(!user){
      throw new Error('User does not exists');
    }

    const {token} = await this.userTokenRepository.generate(user.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname, '..','views','forgot_password.hbs',
    );


    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[GoBarber] Recuperacao de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: 'http://localhost:3000/reset_password?token={{token}}'
        }
      }
    });


    //return user;
  }
}

export default SendForgotEmailService;
