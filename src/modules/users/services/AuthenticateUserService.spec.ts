import 'reflect-metadata';

import FakeUsersRespository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import CreateUserService from '@modules/users/services/CreateUserService';
import Error from '@shared/errors/AppError';

describe('AuthenticateUser',() => {
  it('should be able to Authenticate', async () => {
    const fakeUserRespository = new FakeUsersRespository();
    const authUser = new AuthenticateUserService(fakeUserRespository);

    const response = await authUser.execute({
      email: 'John.Doe@exemple.com',
      password: '123456'
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('John Doe');

  });

  it('should not be able to create a new user with same e-mail', async () => {
    const fakeUserRespository = new FakeUsersRespository();
    const createUser = new AuthenticateUserService(fakeUserRespository);

    await createUser.execute({
      name: 'John Doe',
      email: 'John.Doe@exemple.com',
      password: '123456'
    });

    expect(
      createUser.execute({
        name: 'John Doe',
        email: 'John.Doe@exemple.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(Error)
  });

});
