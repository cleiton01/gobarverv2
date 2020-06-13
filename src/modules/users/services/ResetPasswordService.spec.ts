import 'reflect-metadata';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider'
import ResetPasswordService from '@modules/users/services/ResetPasswordService';
import FakeUsersRespository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUserTokenRepository from '@modules/users/repositories/fakes/FakeUserTokenRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import Error from '@shared/errors/AppError';

describe('ResertPasswordService',() => {

  it('should be able to reset password using valid email', async () => {
    const fakeUserRespository = new FakeUsersRespository();
    const fakeUserTokenRepository = new FakeUserTokenRepository();
    const fakeHashProvider = new FakeHashProvider()
    const resetPassword = new ResetPasswordService(fakeUserRespository, fakeUserTokenRepository, fakeHashProvider);

    const user = await fakeUserRespository.create({
      name: 'John Doe',
      email: 'John.Doe@exemple.com',
      password: '123456'
    });

    const {token} = await fakeUserTokenRepository.generate(user.id);

    await resetPassword.execute({
      password: '1234',
      token
    });

    const updatedUserPass = await fakeUserRespository.findById(user.id);


    expect(updatedUserPass?.password).toBe('1234');

  });

  it('should not be able to reset password with non-existing token', async () => {
    const fakeUserRespository = new FakeUsersRespository();
    const fakeUserTokenRepository = new FakeUserTokenRepository();
    const fakeHashProvider = new FakeHashProvider()
    const resetPassword = new ResetPasswordService(fakeUserRespository, fakeUserTokenRepository, fakeHashProvider);

    const user = await fakeUserRespository.create({
      name: 'John Doe',
      email: 'John.Doe@exemple.com',
      password: '123456'
    });


    await expect(
      resetPassword.execute({
      password: '1234',
      token: 'token'
    })).rejects.toBeInstanceOf(Error);

  });

  it('should not be able to reset password after 2 hour', async () => {
    const fakeUserRespository = new FakeUsersRespository();
    const fakeUserTokenRepository = new FakeUserTokenRepository();
    const fakeHashProvider = new FakeHashProvider()
    const resetPassword = new ResetPasswordService(fakeUserRespository, fakeUserTokenRepository, fakeHashProvider);

    const user = await fakeUserRespository.create({
      name: 'John Doe',
      email: 'John.Doe@exemple.com',
      password: '123456'
    });

    const {token} = await fakeUserTokenRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours()+2);
    });

    await expect(
      resetPassword.execute({
      password: '1234',
      token
    })).rejects.toBeInstanceOf(Error);

  });

});
