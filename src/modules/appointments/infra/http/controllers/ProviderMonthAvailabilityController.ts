import {Request, Response} from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

class ProviderMonthAvailabilityService{
  public async index(req: Request, res:Response): Promise<Response>{
    const provider_id = req.params.provider_id;
    const { month, year } = req.body;

    const listProviderMonthAvailabilityService = container.resolve(ListProviderMonthAvailabilityService);

    const availability = await listProviderMonthAvailabilityService.execute({
      provider_id,
      month,
      year
    });

  return res.status(200).json(availability);
  }

}

export default ProviderMonthAvailabilityService;
