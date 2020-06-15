import {Router, response} from 'express';
import {getCustomRepository} from 'typeorm';
import { startOfHour, parseISO, isEqual} from 'date-fns';
import multer from 'multer';
import uploadConfig from '@config/upload';

import UsersController from '@modules/users/infra/http/controllers/UsersControllers';
import UserAvatarController from '@modules/users/infra/http/controllers/UserAvatarController';

import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UpdateUserAvatar from '@modules/users/services/updateUserAvatarService';

const userRouter = Router();
const upload = multer(uploadConfig);
const usersController = new UsersController();
const userAvatarController = new  UserAvatarController();

userRouter.get('/', usersController.index);

userRouter.post('/', usersController.create);

userRouter.patch('/avatar',
  ensureAuth,
  upload.single('avatar'),
  userAvatarController.update
  );

export default userRouter;
