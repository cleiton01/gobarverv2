import {Request, Response} from 'express';
import {container} from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

class SessionsController{
  public async create(req: Request, res: Response){
  const email = req.body.email;
  const password = req.body.password;

  const authUser = container.resolve(AuthenticateUserService);

  const { user, token } = await authUser.execute({
    email,
    password
  });

  delete user.password;

  return res.status(200).json({user, token});
  }
}

export default SessionsController;
