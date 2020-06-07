import User from '@modules/users/infra/typeorm/entities/User';
import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructir() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string) : Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {id},
    });

    return user;
  }
  public async findAll(): Promise<User[] | undefined>{
    return undefined;
  }

  public async findByEmail(email: string) : Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: {email},
    });

    return findUser;
  }

  public async findByDate(date: Date) : Promise<User | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: {date},
    });

    return findAppointment;
  }

  public async create(userData: ICreateUserDTO): Promise<User>{
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User>{
    return await this.ormRepository.save(user);
  }


}

export default UsersRepository;


