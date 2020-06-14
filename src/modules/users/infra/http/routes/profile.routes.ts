import {Router, response} from 'express';

import ProfileController from '@modules/users/infra/http/controllers/ProfileController';
import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuth);
profileRouter.get('/', profileController.show);

profileRouter.put('/', profileController.update);

profileRouter.delete('/', (req, res) => {
  return res.json({message: "hola"});
});

export default profileRouter;
