import {Router, response} from 'express';
import {celebrate, Segments, Joi} from 'celebrate';

import SessionController from '@modules/users/infra/http/controllers/SessionsController';

const sessionsRouter = Router();
const sessionController = new SessionController()

sessionsRouter.post('/', celebrate({
  [Segments.BODY]:{
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }
}),sessionController.create);

export default sessionsRouter;
