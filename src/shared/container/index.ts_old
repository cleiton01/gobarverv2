import {container} from 'tsyringe';
import '@modules/users/providers';
import '@shared/container/providers/index';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

import IUserTokenRopository from '@modules/users/repositories/IUserTokenRopository';
import UserTokenRepository from '@modules/users/infra/typeorm/repositories/UserTokenRepository';

import BCryptHashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';


container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerInstance<IUsersRepository>(
  'UsersRepository',
  new UserRepository()
);

container.registerSingleton<IHashProvider>(
  'HashProvider',
  BCryptHashProvider
);

container.registerSingleton<IUserTokenRopository>(
  'UserTokenRepository',
  UserTokenRepository
);

