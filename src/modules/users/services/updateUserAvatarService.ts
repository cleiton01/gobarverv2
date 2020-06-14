
import User from '@modules/users/infra/typeorm/entities/User';
import uploadConfig from '@config/upload';
import path from 'path';
import fs from 'fs';
import {inject, injectable} from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '../infra/typeorm/repositories/UserRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface Request {
  user_id: string;
  avatarFileName: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ){}

  public async execute({user_id, avatarFileName}:Request):Promise<User>{

    const user = await this.usersRepository.findById(user_id);

    if(!user){
      throw new AppError(
        String(process.env.AUTH_INVALID_ACESS),
        Number(process.env.AUTH_INVALID_ACESS_STATUS)
      );
    }

    if(user.avatar){
      this.storageProvider.deleteFile(user.avatar);
    }

    const fileName = await this.storageProvider.saveFile(avatarFileName);
    user.avatar = fileName;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
