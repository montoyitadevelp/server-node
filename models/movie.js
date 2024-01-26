import { readJSON } from '../utils/readJSON.js';
import { randomUUID } from 'node:crypto';

const movies = readJSON('../movies/movies.json');

export class MovieModel {
  static getAll = async ({ genre }) => {
    if (genre) {
      return movies.filter((movie) =>
        movie.genre.some(
          (item) => item.toLocaleLowerCase() === genre.toLocaleLowerCase()
        )
      );
    }
    return movies;
  };

  static getById = async ({ id }) => {
    const movie = movies.find((movie) => movie.id === id);

    return movie;
  };

  static createMovie = async ({ movie }) => {
    // en base de datos
    const newMovie = {
      id: randomUUID(),
      ...movie,
    };

    movies.push(newMovie);

    return newMovie;
  };

  static updatedMovie = async ({ id, movie }) => {
    const movieIndex = movies.findIndex((movie) => movie.id === id);
    if (movieIndex === -1) return false;

    movies[movieIndex] = {
      ...movies[movieIndex],
      ...movie,
    };

    return movies[movieIndex];
  };

  static deleteMovie = async ({ id }) => {
    const movieIndex = movies.findIndex((movie) => movie.id === id);

    if (movieIndex === -1) return false;

    movies.splice(movieIndex, 1);
    return true;
  };
}
