import {Request, Response} from 'express';
import { startOfHour, parseISO, isEqual} from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

class AppointmentController{
  public async create(req: Request, res:Response): Promise<Response>{
    const { provider_id, user_id,date } = req.body;

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      provider_id,
      user_id,
      date
    });

  return res.status(200).json(appointment);
  }

  public async find(req: Request, res: Response): Promise<Response>{
    //const appointments = await appoinmentsRepository.findAll();
    return res.json({appointments:'ola'});
  }

}

export default AppointmentController;
