import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import { getRepository, Repository, Raw } from 'typeorm';

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import ICreateAppointmentDTO from '@modules/appointments/dto/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dto/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dto/IFindAllInDayFromProviderDTO';

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

  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]>{
    const parsedMonth = String(month).padStart(2,'0');

    const appointments = this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(dataFieldName => `to_char(${dataFieldName}, 'MMYYYY') = '${parsedMonth}${year}'`),
      }
    });

    return appointments;
  };

  public async findAllInDayFromProvider({
    provider_id,
    day,
    month,
    year
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]>{
    const parsedMonth = String(month).padStart(2,'0');
    const parsedDay = String(day).padStart(2, '0');

    const appointments = this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(dataFieldName => `to_char(${dataFieldName}, 'DDMMYYYY') = '${parsedDay}${parsedMonth}${year}'`),
      }
    });

    return appointments;
  };

}

export default AppoinmentsRepository;
