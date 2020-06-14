import 'reflect-metadata';

import FakeUsersRespository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import ListProviderService from '@modules/appointments/services/ListProviderService';
import Error from '@shared/errors/AppError';

describe('ListProviders',() => {
  it('should be able to list providers', async () => {
    const fakeUserRespository = new FakeUsersRespository();

    const listProfileService = new ListProviderService(
      fakeUserRespository
    );

    const user = await fakeUserRespository.create({
      name: 'John Doe1',
      email: 'John.Doe1@exemple.com',
      password: '123456'
    });

    const user1 = await fakeUserRespository.create({
      name: 'John Doe2',
      email: 'John.Doe2@exemple.com',
      password: '123456'
    });

    const userLogged = await fakeUserRespository.create({
      name: 'John Doe3',
      email: 'John.Doe3@exemple.com',
      password: '123456'
    });

    const providers = await listProfileService.execute({
      user_id: userLogged.id,
    });

    expect(providers).toEqual([user, user1]);

  });
});
