import {Request, Response} from 'express';
import { container } from 'tsyringe';

import ListProviderService from '@modules/appointments/services/ListProviderService';

class ProvidersController{
  public async index(req: Request, res:Response): Promise<Response>{
    const provider_id = req.user.id

    const createAppointment = container.resolve(ListProviderService);

    const appointment = await createAppointment.execute({
      user_id: provider_id,
    });

  return res.status(200).json(appointment);
  }
}

export default ProvidersController;
