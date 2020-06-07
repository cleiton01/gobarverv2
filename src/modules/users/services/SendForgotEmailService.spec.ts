import 'reflect-metadata';

import SendForgotEmailService from '@modules/users/services/SendForgotEmailService';
import FakeUsersRespository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import Error from '@shared/errors/AppError';

describe('CreateUser',() => {
  it('should be able to recove the password using email', async () => {
    const fakeUserRespository = new FakeUsersRespository();
    const createUser = new SendForgotEmailService(fakeUserRespository);

    const user = await createUser.execute({
      email: 'John.Doe@exemple.com'
    });

    expect(user).toHaveProperty('id');

  });

  it('should not be able to recove the password using email', async () => {
    const fakeUserRespository = new FakeUsersRespository();
    const createUser = new SendForgotEmailService(fakeUserRespository);

    await createUser.execute({
      email: 'John.Doe@exemple.com'
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
