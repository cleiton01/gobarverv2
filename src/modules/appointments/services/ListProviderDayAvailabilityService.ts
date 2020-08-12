
import {inject, injectable} from 'tsyringe';
import {getDaysInMonth, getDate, getHours, isAfter} from 'date-fns';

import Error from '@shared/errors/AppError';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository'

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>

@injectable()
class ListProvideDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentRepository: IAppointmentRepository,
  ){}

  public async execute({provider_id, day, month, year }: IRequest): Promise<any>{

    const appointments = await this.appointmentRepository.findAllInDayFromProvider({
      provider_id,
      day,
      month,
      year
    });

    const hourStart = 8 ;

    const eachHourArray = Array.from(
      {length: 10},
      (value, index) => index + hourStart,
    );

    const currentDate = new Date(Date.now());

    const availability = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointments.filter(appointment => {
        return getHours(appointment.date) === hour;
      });
      const compareDate = new Date(year, month-1, day, hour);

      return {
        hour,
        available: !hasAppointmentInHour && isAfter(compareDate, currentDate),
      }
    });

    return availability;
  }
}

export default ListProvideDayAvailabilityService;
