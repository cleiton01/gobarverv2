import 'dotenv/config';

import express from 'express';
import routes from './routes';

import './database';

const app = express();
app.use(express.json());

app.use(routes);

app.listen(process.env.APP_PORT, () => {
  console.log(`servidor iniciado na porta ${process.env.APP_PORT}`);
});
