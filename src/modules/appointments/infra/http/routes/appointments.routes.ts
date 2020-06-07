import {Router} from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentController from '@modules/appointments/infra/http/controllers/AppointmetsController';

const appintmentsRouter = Router();
const appoitmentController = new AppointmentController();

appintmentsRouter.use(ensureAuthenticated);

appintmentsRouter.get('/', appoitmentController.find);

appintmentsRouter.post('/', appoitmentController.create);

appintmentsRouter.put('/:id', (req, res) => {
  return res.json({message: "hola"});
});

appintmentsRouter.delete('/', (req, res) => {
  return res.json({message: "hola"});
});

export default appintmentsRouter;
