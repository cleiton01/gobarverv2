import {Router} from 'express';
import appointmentRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import userRouter from '@modules/users/infra/http/routes/users.routes';
import Auth from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/sessions',Auth);
routes.use('/appointment',appointmentRouter );
routes.use('/user',userRouter);

export default routes;
