import 'reflect-metadata';

import FakeAppointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointmentRepository';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';
import Error from '@shared/errors/AppError';
import {getDaysInMonth, getDate, getHours} from 'date-fns';

describe('ListProviderAppointmentsService',() => {
  it('should be able to list the appointment on a specific day', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();

    const listProviderAppointmentsService = new ListProviderAppointmentsService(
      fakeAppointmentRepository
    );

    const app1 = await fakeAppointmentRepository.create({
      provider_id: '5',
      user_id: '2',
      date: new Date(2020,5, 22, 11, 0, 0 ),
    });

    const app2 = await fakeAppointmentRepository.create({
      provider_id: '5',
      user_id: '2',
      date: new Date(2020,5, 22, 10, 0, 0 ),
    });

    const result = await listProviderAppointmentsService.execute({
      provider_id: '5',
      month: 6,
      year: 2020,
      day: 22
    });

    expect(result).toEqual([app1, app2]);

  });
});
