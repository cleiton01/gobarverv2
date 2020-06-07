import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import { getRepository, Repository } from 'typeorm';

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import ICreateAppointmentDTO from '@modules/appointments/dto/ICreateAppointmentDTO';

class AppoinmentsRepository implements IAppointmentRepository {
  private ormRepository: Repository<Appointment>;

  constructir() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date) : Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: {date},
    });

    return findAppointment;
  }

  public async findAll() : Promise<Appointment[] | undefined> {

    return undefined;
  }

  public async create({provider_id, date}: ICreateAppointmentDTO): Promise<Appointment>{
    const appointment = this.ormRepository.create({provider_id, date});

    await this.ormRepository.save(appointment);

    return appointment;
  }

}

export default AppoinmentsRepository;
