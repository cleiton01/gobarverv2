
import {inject, injectable} from 'tsyringe';

import Error from '@shared/errors/AppError';
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

  public async execute({user_id, name, email, old_password, password, }: IRequest): Promise<User>{

    const user = await this.usersRepository.findById(user_id);

    if(!user){
      throw new Error(
        String(process.env.AUTH_INVALID_ACESS),
        Number(process.env.AUTH_INVALID_ACESS_STATUS)
      );
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if(userWithUpdatedEmail && userWithUpdatedEmail.id != user.id){
      throw new Error(
        String(process.env.AUTH_EMAIL_IN_USE_STATUS),
        Number(process.env.AUTH_EMAIL_IN_USE)
      );
    }

    if (password && !old_password){
      throw new Error(
        String(process.env.AUTH_OLD_PASS_NEEDED_STATUS),
        Number(process.env.AUTH_OLD_PASS_NEEDED)
      );
    }

    if (old_password && ! await this.hashProvider.compareHash(old_password, user.password)){
      throw new Error('Senha antiga invalida');
    }
    if(password){

      user.password = await this.hashProvider.genarateHash(password);
    }

    user.name = name;
    user.email = email;

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
