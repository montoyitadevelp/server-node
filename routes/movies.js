import { Router } from 'express';

import { MovieController } from '../controllers/movies.js';

export const router = Router();

router.get('/', MovieController.getAll);

router.get('/:id', MovieController.getById);

router.post('/', MovieController.createMovie);

router.patch('/:id', MovieController.updatedMovie);

router.delete('/:id', MovieController.deleteMovie);
