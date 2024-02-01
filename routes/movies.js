import { Router } from 'express';
import { MovieController } from '../controllers/movies.js';

export const createMovieRouter = ({ movieModel }) => {
  const router = Router();
  const movieController = new MovieController({ movieModel });

  router.get('/', movieController.getAll);

  router.get('/:id', movieController.getById);

  router.post('/', movieController.createMovie);

  router.patch('/:id', movieController.updatedMovie);

  router.delete('/:id', movieController.deleteMovie);

  return router
};
