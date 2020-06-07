import User from '@modules/users/infra/typeorm/entities/User';
import {isEqual} from 'date-fns'
import {uuid} from 'uuidv4'

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

class UsersRepository implements IUsersRepository {
  private user: User[] = [];

  public async findById(id: string) : Promise<User | undefined> {
    return this.user.find(user => user.id === id);
  }

  public async findByEmail(email: string) : Promise<User | undefined> {
    return this.user.find(user => user.email === email);
  }

  public async findAll() : Promise<User[] | undefined> {
    return this.user;
  }

  public async create(userData: ICreateUserDTO): Promise<User>{
    const user = new User();

    Object.assign(user, {id: uuid()}, userData)

    this.user.push(user);
    return user;
  }

  public async save(user: User): Promise<User>{
    const findIndex = this.user.findIndex(findUser => findUser.id === user.id);

    this.user[findIndex] = user;
    
    return user;
  }

}

export default UsersRepository;
