import 'reflect-metadata';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider'
import SendForgotEmailService from '@modules/users/services/SendForgotEmailService';
import FakeUsersRespository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUserTokenRepository from '@modules/users/repositories/fakes/FakeUserTokenRepository';

import Error from '@shared/errors/AppError';

describe('SendForgotPasswordEmail',() => {
  it('should be able to recove the password using email', async () => {
    const fakeUserRespository = new FakeUsersRespository();
    const fakeMailProvider = new FakeMailProvider();
    const fakeUserTokenRepository = new FakeUserTokenRepository();
    const sendForgotEmail = new SendForgotEmailService(fakeUserRespository, fakeMailProvider, fakeUserTokenRepository);

    await fakeUserRespository.create({
      name: 'John Doe',
      email: 'John.Doe@exemple.com',
      password: '123456'
    });

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await sendForgotEmail.execute({
      email: 'John.Doe@exemple.com'
    });

    expect(sendMail).toHaveBeenCalled();

  });

  it('should not be able to recove the password using a non-existing email', async () => {
    const fakeUserRespository = new FakeUsersRespository();
    const fakeMailProvider = new FakeMailProvider();
    const fakeUserTokenRepository = new FakeUserTokenRepository();
    const sendForgotEmail = new SendForgotEmailService(fakeUserRespository, fakeMailProvider, fakeUserTokenRepository);

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await expect(sendForgotEmail.execute({
      email: 'John.Doe@exemple.com'
    })).rejects.toBeInstanceOf(Error);

  });

  it('should generate a forgot password token', async () => {
    const fakeUserRespository = new FakeUsersRespository();
    const fakeMailProvider = new FakeMailProvider();
    const fakeUserTokenRepository = new FakeUserTokenRepository();
    const sendForgotEmail = new SendForgotEmailService(fakeUserRespository, fakeMailProvider, fakeUserTokenRepository);

    const generateToken = jest.spyOn(fakeUserTokenRepository, 'generate');

    const user = await fakeUserRespository.create({
      name: 'John Doe',
      email: 'John.Doe@exemple.com',
      password: '123456'
    });


    await sendForgotEmail.execute({
      email: 'John.Doe@exemple.com'
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);

  });

});
