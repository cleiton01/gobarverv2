import 'reflect-metadata';

import FakeUsersRespository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import CreateUserService from '@modules/users/services/CreateUserService';
import Error from '@shared/errors/AppError';

describe('AuthenticateUser',() => {
  it('should be able to Authenticate', async () => {
    const fakeUserRespository = new FakeUsersRespository();
    const fakeHashProvider = new FakeHashProvider();

    const authUser = new AuthenticateUserService(fakeUserRespository, fakeHashProvider);

    await fakeUserRespository.create({
      name: 'John Doe',
      email: 'John.Doe@exemple.com',
      password: '123456'
    });

    const response = await authUser.execute({
      email: 'John.Doe@exemple.com',
      password: '123456'
    });

    expect(response).toHaveProperty('token');

  });

  it('should not be able to Authenticate with different password', async () => {
    const fakeUserRespository = new FakeUsersRespository();
    const fakeHashProvider = new FakeHashProvider();

    const authUser = new AuthenticateUserService(fakeUserRespository, fakeHashProvider);

    await fakeUserRespository.create({
      name: 'John Doe',
      email: 'John.Doe@exemple.com',
      password: '123456'
    });

    expect(
      authUser.execute({
        email: 'John.Doe@exemple.com',
        password: '1234567'
      })
    ).rejects.toBeInstanceOf(Error);

  });

  it('should not be able to Authenticate with different e-mail', async () => {
    const fakeUserRespository = new FakeUsersRespository();
    const fakeHashProvider = new FakeHashProvider();

    const authUser = new AuthenticateUserService(fakeUserRespository, fakeHashProvider);

    await fakeUserRespository.create({
      name: 'John Doe',
      email: 'John.Doe@exemple.com',
      password: '123456'
    });

    expect(
      authUser.execute({
        email: 'John.Doi@exemple.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(Error);

  });

});
