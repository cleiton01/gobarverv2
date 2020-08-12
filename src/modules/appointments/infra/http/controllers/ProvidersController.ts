import {Request, Response} from 'express';
import { container } from 'tsyringe';
import {classToClass} from 'class-transformer';

import ListProviderService from '@modules/appointments/services/ListProviderService';

class ProvidersController{
  public async index(req: Request, res:Response): Promise<Response>{
    const user_id = req.body.user.id;

    const listProviders = container.resolve(ListProviderService);

    const providers = await listProviders.execute({
      user_id,
    });

  return res.status(200).json(classToClass(providers));
  }

}

export default ProvidersController;
