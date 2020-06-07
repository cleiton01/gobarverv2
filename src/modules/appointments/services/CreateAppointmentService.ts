
import {startOfHour} from 'date-fns';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';

interface IRequest {
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor (
      @inject('AppointmentsRepository')

      private appointmentsRepository: IAppointmentRepository
    ) {}


  public async execute ({date, provider_id}: IRequest): Promise<Appointment> {


    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate
      );
      console.log(findAppointmentInSameDate);
      if (findAppointmentInSameDate){
        throw new AppError(
          String(process.env.APPOINTMENT_ALREADY_BOOKED),
          Number(process.env.APPOINTMENT_ALREADY_BOOKED_STATUS)
        );
      }

      const appointment = await this.appointmentsRepository.create({
        provider_id,
        date: appointmentDate,
      });

      return appointment;
  }
}

export default CreateAppointmentService;
