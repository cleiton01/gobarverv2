import {Request, Response} from 'express';
import { startOfHour, parseISO, isEqual} from 'date-fns';
import { container } from 'tsyringe';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

class ProviderAppointmentsController{
  public async index(req: Request, res:Response): Promise<Response>{
    const provider_id = req.user.id;
    const { day, month, year } = req.query;

    const listProviderAppointmentsService = container.resolve(ListProviderAppointmentsService);

    const appointments = await listProviderAppointmentsService.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year)
    });

  return res.status(200).json(appointments);
  }

}

export default ProviderAppointmentsController;
