import { validateMovie, validatePartialMovie } from '../schemas/movies.js'
export class MovieController {
  constructor({ movieModel }) {
    this.movieModel = movieModel;
  }
  getAll = async (req, res) => {
    try {
      const { genre } = req.query;

      const filteredMovies = await this.movieModel.getAll({ genre });

      res.status(200).json(filteredMovies);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };
  getById = async (req, res) => {
    try {
      // path-to-regexp
      const { id } = req.params;

      const movie = await this.movieModel.getById({ id });

      if (!movie) {
        res.status(404).json({ message: 'Movie not found' });
      }

      res.status(200).json(movie);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };
  createMovie = async (req, res) => {
    try {
      const result = validateMovie(req.body);

      const newMovie = await this.movieModel.createMovie({ input: result.data });

      if (!result.success) {
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });
      }

      res.status(201).json(newMovie);
    } catch (error) {
      res.status(500).json({ message: 'Error 500' });
    }
  };
  updatedMovie = async (req, res) => {
    try {
      const { id } = req.params;
      const result = validatePartialMovie(req.body);

      if (!result.success) {
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });
      }

      const updatedMovie = await this.movieModel.updatedMovie({
        id,
        input: result.data,
      });

      return res.status(200).json(updatedMovie);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };
  deleteMovie = async (req, res) => {
    try {
      const { id } = req.params;

      const result = await this.movieModel.deleteMovie({ id });

      if (!result) {
        res.status(404).json({ message: 'Movie not found' });
      }

      return res.status(204).json({ message: 'Movie deleted' });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };
}


