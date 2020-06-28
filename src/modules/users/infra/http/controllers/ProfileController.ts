import {Request, Response} from 'express';
import {container} from 'tsyringe';
import {classToClass} from 'class-transformer';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import UsersRepository  from '@modules/users/infra/typeorm/repositories/UserRepository';

class UsersController {
  public async show(req: Request, res: Response): Promise<Response>{

    const showProfile = container.resolve(ShowProfileService);
    const user_id = req.user.id;

    const user = await showProfile.execute({user_id});

    return res.json(classToClass(user));
  }

  public async update(req: Request, res: Response):Promise<Response>{
    const user_id = req.user.id;
    const { name, email, old_password, password } = req.body;

    const createUser = container.resolve(UpdateProfileService);

    const user = await createUser.execute({
      user_id,
      name,
      email,
      old_password,
      password
    });

    return res.status(200).json(classToClass(user));
  }

}

export default UsersController;
