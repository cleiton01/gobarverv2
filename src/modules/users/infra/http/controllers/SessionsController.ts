import {Request, Response} from 'express';
import {container} from 'tsyringe';
import {classToClass} from 'class-transformer';

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

  return res.status(200).json({user: classToClass(user), token});
  }
}

export default SessionsController;
