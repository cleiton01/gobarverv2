import {Router} from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentController from '@modules/appointments/infra/http/controllers/AppointmetsController';

import ProviderAppointmentsController from '@modules/appointments/infra/http/controllers/ProviderAppointmentsController';

const appintmentsRouter = Router();
const appoitmentController = new AppointmentController();
const providerAppointmentsController = new ProviderAppointmentsController();

appintmentsRouter.use(ensureAuthenticated);

appintmentsRouter.get('/', appoitmentController.find);

appintmentsRouter.post('/', appoitmentController.create);

appintmentsRouter.get('/me', providerAppointmentsController.index);

export default appintmentsRouter;
