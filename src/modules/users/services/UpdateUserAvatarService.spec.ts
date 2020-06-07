import 'reflect-metadata';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import updateUserAvatarService from '@modules/users/services/updateUserAvatarService';

import FakeUsersRespository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import CreateUserService from '@modules/users/services/CreateUserService';
import Error from '@shared/errors/AppError';

describe('UpdateUserAvatar',() => {
  it('should be able to Authenticate', async () => {
    const fakeUserRespository = new FakeUsersRespository();
    //const fakeHashProvider = new FakeHashProvider();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvata = new updateUserAvatarService(
      fakeUserRespository,
      fakeStorageProvider
    );

    const user = await fakeUserRespository.create({
      name: 'John Doe',
      email: 'John.Doe@exemple.com',
      password: '123456'
    });

    const resulte = await updateUserAvata.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg'
    });

    expect(resulte.avatar).toBe('avatar.jpg');

  });

  it('should not be able to update from non exist user', async () => {
    const fakeUserRespository = new FakeUsersRespository();
    const fakeHashProvider = new FakeHashProvider();

    const authUser = new AuthenticateUserService(fakeUserRespository, fakeHashProvider);

    expect(
      authUser.execute({
        email: 'John.Doi@exemple.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(Error);

  });


  it('should delete old avatar when set new one', async () => {
    const fakeUserRespository = new FakeUsersRespository();
    const fakeStorageProvider = new FakeStorageProvider();
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateUserAvata = new updateUserAvatarService(
      fakeUserRespository,
      fakeStorageProvider
    );

    const user = await fakeUserRespository.create({
      name: 'John Doe',
      email: 'John.Doe@exemple.com',
      password: '123456'
    });

    const resulte = await updateUserAvata.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg'
    });

    const resulte1 = await updateUserAvata.execute({
      user_id: user.id,
      avatarFileName: 'avatar2.jpg'
    });

    expect(deleteFile).toBeCalledWith('avatar.jpg');

    expect(resulte1.avatar).toBe('avatar2.jpg');

  });

});
