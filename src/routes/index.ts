import {Router} from 'express';
import appointmentRouter from './appointments.router';

const routes = Router();

routes.use('/appointment',appointmentRouter );



export default routes;
