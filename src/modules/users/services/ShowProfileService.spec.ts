import 'reflect-metadata';

import FakeUsersRespository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import Error from '@shared/errors/AppError';

describe('ShowUserProfile',() => {
  it('should be able to show profile', async () => {
    const fakeUserRespository = new FakeUsersRespository();
    const fakeHashProvider = new FakeHashProvider();

    const showProfileService = new ShowProfileService(
      fakeUserRespository
    );

    const user = await fakeUserRespository.create({
      name: 'John Doe',
      email: 'John.Doe@exemple.com',
      password: '123456'
    });

    const resulte = await showProfileService.execute({
      user_id: user.id,
    });

    expect(resulte.name).toBe('John Doe');
    expect(resulte.email).toBe('John.Doe@exemple.com');

  });

  it('should not be able to show profile from a non-exists profile', async () => {
    const fakeUserRespository = new FakeUsersRespository();
    const fakeHashProvider = new FakeHashProvider();

    const showProfileService = new ShowProfileService(
      fakeUserRespository
    );

    await expect(
      showProfileService.execute({
        user_id: 'user.id'
      })
    ).rejects.toBeInstanceOf(Error);

  });
});
