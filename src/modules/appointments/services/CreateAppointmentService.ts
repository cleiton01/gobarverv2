
import {startOfHour, isBefore, getHours} from 'date-fns';
import { injectable, inject } from 'tsyringe';
import Error from '@shared/errors/AppError';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';

interface IRequest {
  provider_id: string;
  date: Date;
  user_id?: string;
}

@injectable()
class CreateAppointmentService {
  constructor (
      @inject('AppointmentsRepository')

      private appointmentsRepository: IAppointmentRepository
    ) {}


  public async execute ({date, provider_id, user_id}: IRequest): Promise<Appointment> {


    const appointmentDate = startOfHour(date);

    if(isBefore(appointmentDate, Date.now())){
      throw new Error('You can not create appointment in a past date');
    }

    if (provider_id === user_id){
      throw new Error('You cant not create an appointment with yourself');
    }

    if(getHours(appointmentDate) < 8 || getHours(appointmentDate) >17 ){
      throw new Error('Invalid hour to appointment');
    }
    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate
      );

      if (findAppointmentInSameDate){
        throw new Error(
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
