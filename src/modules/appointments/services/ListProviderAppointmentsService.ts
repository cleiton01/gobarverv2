
import {inject, injectable} from 'tsyringe';

import Error from '@shared/errors/AppError';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import {classToClass} from 'class-transformer';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentRepository: IAppointmentRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,

  ){}

  public async execute({provider_id, month, year, day }: IRequest): Promise<Appointment[]>{
    const cacheKey = `providers-appointment-list:${provider_id}:${year}-${month}-${day}`;

    let appointments = await this.cacheProvider.recover<Appointment[]>(cacheKey);

    if(!appointments){
      appointments = await this.appointmentRepository.findAllInDayFromProvider({
        provider_id,
        day,
        month,
        year
      });

      await this.cacheProvider.save(cacheKey, classToClass(appointments));
    }

    return appointments;
  }
}

export default ListProviderAppointmentsService;
