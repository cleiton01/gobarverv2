import {Router} from 'express';
import {uuid} from 'uuidv4';
import { startOfHour, parseISO, isEqual} from 'date-fns';
import Appointment from '../models/Appointment';
import AppoinmentsRepository  from '../repositories/AppointmentRepository';

const appintmentsRouter = Router();
const appointmentsRepository = new AppoinmentsRepository();

appintmentsRouter.get('/', (req, res) => {

  const appointments = appointmentsRepository.all();
  return res.json(appointments);
});

appintmentsRouter.post('/', (req, res) => {

  const { provider, date } = req.body;

  const parsedDate = startOfHour( parseISO(date) );

  const findAppointmentInSameDate = appointmentsRepository.findByDate(parsedDate);

  if (findAppointmentInSameDate){
    return res
      .status(Number(process.env.APPOINTMENT_ALREADY_BOOKED_STATUS)).
      json({ error: process.env.APPOINTMENT_ALREADY_BOOKED});
  }

  const appointment = appointmentsRepository.create({ 
    provider, 
    date: parsedDate
  });

  return res.json(appointment);

});

appintmentsRouter.put('/:id', (req, res) => {
  return res.json({message: "hola"});
});

appintmentsRouter.delete('/', (req, res) => {
  return res.json({message: "hola"});
});

export default appintmentsRouter;
