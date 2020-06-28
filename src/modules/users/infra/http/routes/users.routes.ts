import {Router, response} from 'express';
import {celebrate, Segments, Joi} from 'celebrate';

import multer from 'multer';
import uploadConfig from '@config/upload';

import UsersController from '@modules/users/infra/http/controllers/UsersControllers';
import UserAvatarController from '@modules/users/infra/http/controllers/UserAvatarController';

import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const userRouter = Router();
const upload = multer(uploadConfig);
const usersController = new UsersController();
const userAvatarController = new  UserAvatarController();

userRouter.get('/', usersController.index);

userRouter.post('/', celebrate({
  [Segments.BODY]: {
    nome: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }
}),usersController.create);

userRouter.patch('/avatar',
  ensureAuth,
  upload.single('avatar'),
  userAvatarController.update
  );

export default userRouter;
