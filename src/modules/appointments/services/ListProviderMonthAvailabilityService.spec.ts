import 'reflect-metadata';

import FakeAppointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointmentRepository';

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';
import Error from '@shared/errors/AppError';

describe('ListProviderMonthAvailabilityService',() => {
  it('should be able to list the month availability from provider', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();

    const listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(
      fakeAppointmentRepository
    );


    await fakeAppointmentRepository.create({
      provider_id: '3',
      date: new Date(2020,5, 19, 9, 0, 0 ),
    });

    await fakeAppointmentRepository.create({
      provider_id: '4',
      date: new Date(2020,5, 19, 10, 0, 0 ),
    });

    await fakeAppointmentRepository.create({
      provider_id: '2',
      date: new Date(2020,5, 19, 11, 0, 0 ),
    });

    await fakeAppointmentRepository.create({
      provider_id: '3',
      date: new Date(2020,5, 19, 12, 0, 0 ),
    });

    await fakeAppointmentRepository.create({
      provider_id: '4',
      date: new Date(2020,5, 19, 13, 0, 0 ),
    });

    await fakeAppointmentRepository.create({
      provider_id: '4',
      date: new Date(2020,5, 19, 14, 0, 0 ),
    });

    await fakeAppointmentRepository.create({
      provider_id: '4',
      date: new Date(2020,5, 19, 15, 0, 0 ),
    });

    await fakeAppointmentRepository.create({
      provider_id: '4',
      date: new Date(2020,5, 19, 16, 0, 0 ),
    });

    await fakeAppointmentRepository.create({
      provider_id: '4',
      date: new Date(2020,5, 19, 17, 0, 0 ),
    });

    await fakeAppointmentRepository.create({
      provider_id: '4',
      date: new Date(2020,5, 19, 18, 0, 0 ),
    });

    await fakeAppointmentRepository.create({
      provider_id: '5',
      date: new Date(2020,5, 20, 10, 0, 0 ),
    });

    const result = await listProviderMonthAvailabilityService.execute({
      provider_id: 'a',
      month: 6,
      year: 2020,
    });

    expect(result).toEqual(expect.arrayContaining([
      {day: 19, available: false},
      {day: 20, available: true},
    ]));

  });
});