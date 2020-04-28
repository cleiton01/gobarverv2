import Appointment from '../models/Appointment';
import { isEqual} from 'date-fns';

interface CreateApointmentDTO {
  provider: string;
  date: Date;
}

class AppoinmentsRepository {

  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public findByDate(date: Date) : Appointment | null {
    const findAppointment = this.appointments.find(appointment =>
      isEqual( date, appointment.date),
    );
    return findAppointment || null;
  }

  public create({ provider, date} : CreateApointmentDTO): Appointment {

    const appointment = new Appointment({ provider, date } );

    this.appointments.push(appointment);

    return appointment;
  }

  public all(): Appointment[] {
    return this.appointments;
  }

}

export default AppoinmentsRepository;
