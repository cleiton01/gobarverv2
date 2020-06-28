import 'reflect-metadata';

import FakeAppointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointmentRepository';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';
import Error from '@shared/errors/AppError';
import {getDaysInMonth, getDate, getHours} from 'date-fns';

describe('ListProviderDayAvailabilityService',() => {
  it('should be able to list the month availability from provider', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();

    const listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(
      fakeAppointmentRepository
    );

    await fakeAppointmentRepository.create({
      provider_id: '5',
      user_id: '1',
      date: new Date(2020,6, 20, 8-3, 0, 0 ),
    });

    await fakeAppointmentRepository.create({
      provider_id: '6',
      user_id: '1',
      date: new Date(2020,6, 20, 10, 0, 0 ),
    });

    const result = await listProviderDayAvailabilityService.execute({
      provider_id: 'a',
      month: 5,
      year: 2020,
      day: 20
    });

    expect(result).toEqual(expect.arrayContaining([
      {hour: 8, available: false},
      {hour: 10, available: false},
    ]));

  });
});
