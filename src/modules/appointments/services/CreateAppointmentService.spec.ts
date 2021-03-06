import 'reflect-metadata';

import FakesNotificationRepository from '@modules/notifications/repositories/fakes/FakesNotificationRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import FakeAppointmentRespository from '@modules/appointments/repositories/fakes/FakeAppointmentRepository';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fake/FakeCacheProvider';

import Error from '@shared/errors/AppError';

describe('CreateAppointment',() => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentRespository = new FakeAppointmentRespository();
    const fakesNotificationRepository = new FakesNotificationRepository();
    const fakeCacheProvider = new FakeCacheProvider();

    const createAppointment = new CreateAppointmentService(
      fakeAppointmentRespository,
      fakesNotificationRepository,
      fakeCacheProvider
      );

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 17, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 5, 17, 13),
      user_id: '1',
      provider_id: '1234567'
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1234567');

  });

  it('should not be able to create two appointment on the same time', async () => {
    const fakeAppointmentRespository = new FakeAppointmentRespository();
    const fakesNotificationRepository = new FakesNotificationRepository();
    const fakeCacheProvider = new FakeCacheProvider();

    const createAppointment = new CreateAppointmentService(
      fakeAppointmentRespository,
      fakesNotificationRepository,
      fakeCacheProvider
      );

    const appDate = new Date(2020, 6, 18, 12);
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 6, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: appDate,
      user_id: '1',
      provider_id: '1234567'
    });

    await expect(createAppointment.execute({
      date: appDate,
      provider_id: '1234567',
      user_id: 'asdfasdf'
    })).rejects.toBeInstanceOf(Error);

  });

  it('should not be able to create an appointment on past date', async () => {
    const fakeAppointmentRespository = new FakeAppointmentRespository();
    const fakesNotificationRepository = new FakesNotificationRepository();
    const fakeCacheProvider = new FakeCacheProvider();

    const createAppointment = new CreateAppointmentService(
      fakeAppointmentRespository,
      fakesNotificationRepository,
      fakeCacheProvider
      );

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 6, 10, 12).getTime();
    });

    await expect(createAppointment.execute({
      date: new Date(2020, 6, 10, 11),
      user_id: '1',
      provider_id: '1234567'
    })).rejects.toBeInstanceOf(Error);

  });

  it('should not be able to create an appointment with same user as provider', async () => {
    const fakeAppointmentRespository = new FakeAppointmentRespository();
    const fakesNotificationRepository = new FakesNotificationRepository();
    const fakeCacheProvider = new FakeCacheProvider();

    const createAppointment = new CreateAppointmentService(
      fakeAppointmentRespository,
      fakesNotificationRepository,
      fakeCacheProvider
      );

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 6, 10, 12).getTime();
    });

    await expect(createAppointment.execute({
      date: new Date(2020, 6, 10, 11),
      provider_id: '1234567',
      user_id: '1234567'
    })).rejects.toBeInstanceOf(Error);

  });

  it('should not be able to create an appointment before 8 a.m', async () => {
    const fakeAppointmentRespository = new FakeAppointmentRespository();
    const fakesNotificationRepository = new FakesNotificationRepository();
    const fakeCacheProvider = new FakeCacheProvider();

    const createAppointment = new CreateAppointmentService(
      fakeAppointmentRespository,
      fakesNotificationRepository,
      fakeCacheProvider
      );

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 6, 18, 6).getTime();
    });

    await expect(createAppointment.execute({
      date: new Date(2020, 6, 19, 7),
      provider_id: '1234567',
      user_id: '12345674'
    })).rejects.toBeInstanceOf(Error);

  });

  it('should not be able to create an appointment after 7 p.m', async () => {
    const fakeAppointmentRespository = new FakeAppointmentRespository();
    const fakesNotificationRepository = new FakesNotificationRepository();
    const fakeCacheProvider = new FakeCacheProvider();

    const createAppointment = new CreateAppointmentService(
      fakeAppointmentRespository,
      fakesNotificationRepository,
      fakeCacheProvider
      );

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 6, 18, 6).getTime();
    });

    await expect(createAppointment.execute({
      date: new Date(2020, 6, 18, 18),
      provider_id: '1234567',
      user_id: '12345674'
    })).rejects.toBeInstanceOf(Error);

  });

});
