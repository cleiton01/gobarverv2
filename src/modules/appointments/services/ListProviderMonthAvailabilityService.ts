
import {inject, injectable} from 'tsyringe';

import Error from '@shared/errors/AppError';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository'
import User from '@modules/users/infra/typeorm/entities/User';


interface IRequest {
  user_id: string;
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
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository,
  ){}

  public async execute({user_id, month, year }: IRequest): Promise<IResponse>{
    const appointments = this.appointmentRepository.create;

    return [{day: 1, available: false}];
  }
}

export default ListProvideMonthAvailabilityService;
