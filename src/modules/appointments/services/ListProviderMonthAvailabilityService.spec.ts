import 'reflect-metadata';

import FakeAppointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointmentRepository';

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';
import Error from '@shared/errors/AppError';

describe('ListProviderMonthAvailabilityService',() => {
  it('should be able to list the month availability from provider', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();

    const listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService();

    await fakeAppointmentRepository.create({
      provider_id: '1',
      date: new Date(2020,4, 20, 8, 0, 0 ),
    });

    await fakeAppointmentRepository.create({
      provider_id: '2',
      date: new Date(2020,4, 20, 10, 0, 0 ),
    });

    await fakeAppointmentRepository.create({
      provider_id: '3',
      date: new Date(2020,4, 21, 8, 0, 0 ),
    });

    await fakeAppointmentRepository.create({
      provider_id: '4',
      date: new Date(2020,4, 21, 10, 0, 0 ),
    });

    const result = await listProviderMonthAvailabilityService.execute({
      user_id: 'a',
      month: 5,
      year: 2020,
    });

    expect(result).toEqual(expect.arrayContaining([
      {day: 19, available: true},
      {day: 20, available: false},
      {day: 21, available: false},
      {day: 22, available: true},
    ]));

  });
});
