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

  it('should not be able to update from non exist user', async () => {
    const fakeUserRespository = new FakeUsersRespository();
    const fakeHashProvider = new FakeHashProvider();

    const updateUserAvata = new UpdateProfileService(
      fakeUserRespository,
      fakeHashProvider
    );

    expect(
      authUser.execute({
        email: 'John.Doi@exemple.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(Error);

  });


});
