import 'reflect-metadata';

import CreateUserService from '@modules/users/services/CreateUserService';
import FakeUsersRespository from '@modules/users/repositories/fakes/FakeUsersRepository';
import Error from '@shared/errors/AppError';

describe('CreateUser',() => {
  it('should be able to create a new user', async () => {
    const fakeUserRespository = new FakeUsersRespository();
    const createUser = new CreateUserService(fakeUserRespository);

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'John.Doe@exemple.com',
      password: '123456'
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('John Doe');

  });

  it('should not be able to create a new user with same e-mail', async () => {
    const fakeUserRespository = new FakeUsersRespository();
    const createUser = new CreateUserService(fakeUserRespository);

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
