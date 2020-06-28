import {Request, Response} from 'express';
import {container} from 'tsyringe';
import {classToClass} from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';
import UsersRepository  from '@modules/users/infra/typeorm/repositories/UserRepository';
import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuthenticated';

class UsersController {
  public async create(req: Request, res: Response):Promise<Response>{

    const { name, password, email } = req.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      password,
      email
    });

    return res.status(200).json(classToClass(user));

  }

  public async index(req: Request, res: Response): Promise<Response>{

    const usersRepository = container.resolve(UsersRepository);

    const users = await usersRepository.findAll();
    return res.json(users);
  }
  public async update(req: Request, res: Response){}
  public async delete(req: Request, res: Response){}
  public async show(req: Request, res: Response){}
}

export default UsersController;
