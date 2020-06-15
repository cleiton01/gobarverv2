import 'reflect-metadata';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import FakeAppointmentRespository from '@modules/appointments/repositories/fakes/FakeAppointmentRepository';
import Error from '@shared/errors/AppError';

describe('CreateAppointment',() => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentRespository = new FakeAppointmentRespository();
    const createAppointment = new CreateAppointmentService(fakeAppointmentRespository);

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '1234567'
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1234567');

  });

  it('should not be able to create two appointment on the same time', async () => {
    const fakeAppointmentRespository = new FakeAppointmentRespository();
    const createAppointment = new CreateAppointmentService(fakeAppointmentRespository);
    const appDate = new Date(2020, 4, 10, 11);

    const appointment = await createAppointment.execute({
      date: appDate,
      provider_id: '1234567'
    });

    await expect(createAppointment.execute({
      date: appDate,
      provider_id: '1234567'
    })).rejects.toBeInstanceOf(Error);

  });
});
