import { MovieModel } from '../models/mongodb/movies.js';
import { validateMovie, validatePartialMovie } from '../schemas/movies.js';
export class MovieController {
  static async getAll(req, res) {
    try {
      const { genre } = req.query;

      const filteredMovies = await MovieModel.getAll({ genre });

      res.status(200).json(filteredMovies);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
  static async getById(req, res) {
    try {
      // path-to-regexp
      const { id } = req.params;

      const movie = await MovieModel.getById({ id });

      if (!movie) {
        res.status(404).json({ message: 'Movie not found' });
      }

      res.status(200).json(movie);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
  static async createMovie(req, res) {
    try {
      const result = validateMovie(req.body);

      const newMovie = await MovieModel.createMovie({ input: result.data });

      if (!result.success) {
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });
      }

      res.status(201).json(newMovie);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
  static async updatedMovie(req, res) {
    try {
      const { id } = req.params;
      const result = validatePartialMovie(req.body);

      if (!result.success) {
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });
      }

      const updatedMovie = await MovieModel.updatedMovie({
        id,
        input: result.data,
      });

      return res.status(200).json(updatedMovie);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
  static async deleteMovie(req, res) {
    try {
      const { id } = req.params;

      const result = await MovieModel.deleteMovie({ id });

      if (!result) {
        res.status(404).json({ message: 'Movie not found' });
      }

      return res.status(204).json({ message: 'Movie deleted' });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}
