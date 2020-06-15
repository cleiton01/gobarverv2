import {Request, Response} from 'express';
import { container } from 'tsyringe';

import ListProviderService from '@modules/appointments/services/ListProviderService';
import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

class ProvidersController{
  public async index(req: Request, res:Response): Promise<Response>{
    const provider_id = req.user.id

    const createAppointment = container.resolve(ListProviderService);

    const appointment = await createAppointment.execute({
      user_id: provider_id,
    });

  return res.status(200).json(appointment);
  }

  public async show(req: Request, res:Response): Promise<Response>{
    const provider_id = req.user.id

    const createAppointment = container.resolve(ListProviderMonthAvailabilityService);

    const appointment = await createAppointment.execute({
      provider_id: 's',
      month: 4,
      year: 2020
    });

  return res.status(200).json(appointment);
  }

}

export default ProvidersController;
