import {Router} from 'express';
import appointmentRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import providersRouter from '@modules/appointments/infra/http/routes/providers.routes';
import userRouter from '@modules/users/infra/http/routes/users.routes';
import Auth from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';

const routes = Router();

routes.use('/appointment',appointmentRouter );
routes.use('/providers',providersRouter );

routes.use('/user',userRouter);

routes.use('/password',passwordRouter);
routes.use('/profile',profileRouter);
routes.use('/sessions', Auth);


export default routes;
