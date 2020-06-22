import {Request, Response} from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

class ProviderMonthAvailabilityService{
  public async index(req: Request, res:Response): Promise<Response>{
    const provider_id = req.params.provider_id;
    const { day, month, year } = req.body;

    const listProviderMonthAvailabilityService = container.resolve(ListProviderDayAvailabilityService);

    const availability = await listProviderMonthAvailabilityService.execute({
      provider_id,
      day,
      month,
      year
    });

  return res.status(200).json(availability);
  }

}

export default ProviderMonthAvailabilityService;
