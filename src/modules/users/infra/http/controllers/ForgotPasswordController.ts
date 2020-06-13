import {Request, Response} from 'express';
import {container}from 'tsyringe';

import SendForgotEmailService from '@modules/users/services/SendForgotEmailService';

class ForgotPasswordController{
  public async create(req: Request, res: Response){
    const {email} = req.body;

  const sendForgotEmailService = container.resolve(SendForgotEmailService);

  await sendForgotEmailService.execute({ email });

  return res.status(204).json();
  }
}

export default ForgotPasswordController;
