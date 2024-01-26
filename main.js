
import express, { json } from 'express';
import { router } from './routes/movies.js';
import { corsMiddleware } from './middlewares/cors.js';

const app = express();

app.disable('x-powered-by');
// middleware para captura la request y hacer la transformacion.
app.use(json());
app.use(corsMiddleware());
app.use('/movies', router)

const PORT = process.env.PORT ?? 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
