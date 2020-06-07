import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

import ICreateAppointmentDTO from '@modules/appointments/dto/ICreateAppointmentDTO';

export default interface IAppointmentRepository{
  create(data: ICreateAppointmentDTO): Promise<Appointment>;

  findByDate(date: Date): Promise<Appointment | undefined>;
  findAll(): Promise<Appointment[] | undefined>;
}
