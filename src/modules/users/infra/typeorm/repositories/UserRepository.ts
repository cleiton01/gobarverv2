import User from '@modules/users/infra/typeorm/entities/User';
import { getRepository, Repository, Not } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';


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
    return await this.ormRepository.find();
  }

  public async findByEmail(email: string) : Promise<User | undefined> {
    console.log('ta dificl');
    console.log(email);
    console.log(this.ormRepository);
    const findUser = this.ormRepository.findOne({
      where: {email},
    });
    console.log('passou aqui')
    return findUser;
  }

  public async findAllProviders({excep_user_id}: IFindAllProvidersDTO): Promise<User[]>{
    let users: User[];

    if(excep_user_id){
      users = await this.ormRepository.find({
        where: {
          id: Not(excep_user_id),
        }
      });
    }else{
      users = await this.ormRepository.find();
    }
    return users;
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


