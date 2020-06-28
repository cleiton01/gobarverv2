import {Router, response} from 'express';
import {celebrate, Segments, Joi} from 'celebrate';

import ProfileController from '@modules/users/infra/http/controllers/ProfileController';
import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuth);
profileRouter.get('/', profileController.show);

profileRouter.put('/',celebrate({
  [Segments.BODY]:{
    name: Joi.string().required(),
    email:Joi.string().email().required(),
    old_password: Joi.string(),
    password: Joi.string(),
    password_confirmation: Joi.string().valid(Joi.ref('password'))

  }
}) ,profileController.update);

profileRouter.delete('/', (req, res) => {
  return res.json({message: "hola"});
});

export default profileRouter;
