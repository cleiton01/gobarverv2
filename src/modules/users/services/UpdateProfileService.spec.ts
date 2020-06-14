import 'reflect-metadata';

import FakeUsersRespository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import Error from '@shared/errors/AppError';

describe('UpdateUserProfile',() => {
  it('should be able to update profile', async () => {
    const fakeUserRespository = new FakeUsersRespository();
    const fakeHashProvider = new FakeHashProvider();

    const updateUserProfile = new UpdateProfileService(
      fakeUserRespository,
      fakeHashProvider
    );

    const user = await fakeUserRespository.create({
      name: 'John Doe',
      email: 'John.Doe@exemple.com',
      password: '123456'
    });

    const resulte = await updateUserProfile.execute({
      user_id: user.id,
      name: 'John Doer',
      email: 'John.Doer@exemple.com',
    });

    expect(resulte.name).toBe('John Doer');
    expect(resulte.email).toBe('John.Doer@exemple.com');

  });

  it('should not be able to update user email to another exists email', async () => {
    const fakeUserRespository = new FakeUsersRespository();
    const fakeHashProvider = new FakeHashProvider();

    const updateUserProfile = new UpdateProfileService(
      fakeUserRespository,
      fakeHashProvider
    );

    let user = await fakeUserRespository.create({
      name: 'John Doe',
      email: 'John.Doe@exemple.com',
      password: '123456'
    });

    let user1 = await fakeUserRespository.create({
      name: 'John Doe',
      email: 'John.Doe3@exemple.com',
      password: '123456'
    });

    await expect(
      updateUserProfile.execute({
        user_id: user.id,
        name: 'John Doer',
        email: 'John.Doe3@exemple.com',
      })
    ).rejects.toBeInstanceOf(Error);

  });

  it('should not be able to update from non exist user', async () => {
    const fakeUserRespository = new FakeUsersRespository();
    const fakeHashProvider = new FakeHashProvider();

    const updateUserProfile = new UpdateProfileService(
      fakeUserRespository,
      fakeHashProvider
    );

    expect(
      updateUserProfile.execute({
        user_id: 'user.id',
        name: 'John Doer',
        email: 'John.Doer@exemple.com',
      })
    ).rejects.toBeInstanceOf(Error);

  });

  it('should be able to update the password', async () => {
    const fakeUserRespository = new FakeUsersRespository();
    const fakeHashProvider = new FakeHashProvider();

    const updateUserProfile = new UpdateProfileService(
      fakeUserRespository,
      fakeHashProvider
    );

    const user = await fakeUserRespository.create({
      name: 'John Doe',
      email: 'John.Doe@exemple.com',
      password: '123456'
    });

    const resulte = await updateUserProfile.execute({
      user_id: user.id,
        name: 'John Doer',
        email: 'John.Doer@exemple.com',
        old_password: '123456',
        password: '1234567',
    });

    expect(resulte.password).toBe('1234567');
  });

  it('should not be able to update the passwoth without old password', async () => {
    const fakeUserRespository = new FakeUsersRespository();
    const fakeHashProvider = new FakeHashProvider();

    const updateUserProfile = new UpdateProfileService(
      fakeUserRespository,
      fakeHashProvider
    );

    const user = await fakeUserRespository.create({
      name: 'John Doe',
      email: 'John.Doe@exemple.com',
      password: '123456'
    });

    expect(
      updateUserProfile.execute({
      user_id: user.id,
        name: 'John Doer',
        email: 'John.Doer@exemple.com',
        password: '1234567',
    })
    ).rejects.toBeInstanceOf(Error);

  });

  it('should not be able to update the passwoth with wrong old password', async () => {
    const fakeUserRespository = new FakeUsersRespository();
    const fakeHashProvider = new FakeHashProvider();

    const updateUserProfile = new UpdateProfileService(
      fakeUserRespository,
      fakeHashProvider
    );

    const user = await fakeUserRespository.create({
      name: 'John Doe',
      email: 'John.Doe@exemple.com',
      password: '123456'
    });

    expect(
      updateUserProfile.execute({
      user_id: user.id,
      name: 'John Doer',
      email: 'John.Doer@exemple.com',
      old_password: 'asdfqwe',
      password: '12345678',
    })
    ).rejects.toBeInstanceOf(Error);
  });


});
