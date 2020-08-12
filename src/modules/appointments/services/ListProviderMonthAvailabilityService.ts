
import {inject, injectable} from 'tsyringe';
import {getDaysInMonth, getDate, isAfter} from 'date-fns';

import Error from '@shared/errors/AppError';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository'

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>

@injectable()
class ListProvideMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentRepository: IAppointmentRepository,
  ){}

  public async execute({provider_id, month, year }: IRequest): Promise<IResponse>{
    const appointments = await this.appointmentRepository.findAllInMonthFromProvider({
      provider_id,
      month,
      year
    });

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month-1));

    const eachDayArray = Array.from(
      {length: numberOfDaysInMonth},
      (value, index) => index + 1,
    );

    const availability = eachDayArray.map(day => {
      const compreDate = new Date(year, month-1, day, 23, 59, 59);

      const appointmentsInDay = appointments.filter(appointment => {
        return getDate(appointment.date) === day ;
      });

      return {
        day,
        available: isAfter( compreDate, new Date()) && appointmentsInDay.length < 10,
      }
    });

    return availability;
  }
}

export default ListProvideMonthAvailabilityService;
