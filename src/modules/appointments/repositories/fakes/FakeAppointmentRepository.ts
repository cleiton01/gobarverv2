import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import {isEqual, getMonth, getDate, getYear} from 'date-fns'
import {uuid} from 'uuidv4'

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import ICreateAppointmentDTO from '@modules/appointments/dto/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dto/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dto/IFindAllInDayFromProviderDTO';

class FakeAppoinmentsRepository implements IAppointmentRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date) : Promise<Appointment | undefined> {
    return await this.appointments.find(appointment => isEqual(appointment.date, date));
  }

  public async findAll() : Promise<Appointment[] | undefined> {

    return this.appointments;
  }

  public async create({provider_id, user_id, date}: ICreateAppointmentDTO): Promise<Appointment>{
    const appointment = new Appointment();

    appointment.id = uuid();
    appointment.date = date;
    appointment.provider_id = provider_id;
    console.log(user_id);

    await this.appointments.push(appointment);
    return appointment;
  }

  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]>{

    const appointments = this.appointments.filter(appointment => {
      return (
      appointment.provider_id == provider_id &&
      getMonth(appointment.date)+1 === month &&
      getYear(appointment.date) === year
      )
    });

    return appointments;
  };

  public async findAllInDayFromProvider({
    provider_id,
    day,
    month,
    year
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]>{

    const appointments = this.appointments.filter(appointment => {
      return (appointment.provider_id === provider_id &&
      getDate(appointment.date) === day &&
      getMonth(appointment.date)+1 === month &&
      getYear(appointment.date) === year)
    });

    return appointments;
  };

}

export default FakeAppoinmentsRepository;
