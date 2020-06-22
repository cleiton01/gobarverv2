
import {inject, injectable} from 'tsyringe';

import Error from '@shared/errors/AppError';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository'

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository,
  ){}

  public async execute({provider_id, month, year, day }: IRequest): Promise<Appointment[]>{
    const appointments = await this.appointmentRepository.findAllInDayFromProvider({
      provider_id,
      day,
      month,
      year
    });

    return appointments;
  }
}

export default ListProviderAppointmentsService;
