const { validateMovie, validatePartialMovie } = require('./schemas/movies');
const express = require('express');
const cors = require('cors');
const crypto = require('node:crypto');
const movies = require('./movies/movies.json');
const app = express();

app.disable('x-powered-by');
// middleware para captura la request y hacer la transformacion.
app.use(express.json());
app.use(
  cors({
    origin: 'http://127.0.0.1:5500',
  })
);

const PORT = process.env.PORT ?? 8000;

app.get('/', (req, res) => {
  res.json({ message: 'Hello everybody' });
});

app.get('/movies', (req, res) => {
  const { genre } = req.query;

  if (genre) {
    const filteredMovies = movies.filter((movie) =>
      movie.genre.some(
        (item) => item.toLocaleLowerCase() === genre.toLocaleLowerCase()
      )
    );
    return res.status(200).json(filteredMovies);
  }
  res.status(200).json(movies);
});

app.get('/movies/:id', (req, res) => {
  // path-to-regexp
  const { id } = req.params;
  const movie = movies.find((movie) => movie.id === id);
  if (!movie) {
    res.status(404).json({ message: 'Movie not found' });
  }
  res.status(200).json(movie);
});

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body);

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data,
  };

  movies.push(newMovie);

  res.status(201).json(newMovie);
});

app.patch('/movies/:id', (req, res) => {
  const { id } = req.params;
  const result = validatePartialMovie(req.body);
  const movieIndex = movies.findIndex((movie) => movie.id === id);

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  if (!movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' });
  }

  const updatedMovie = {
    ...movies[movieIndex],
    ...result.data,
  };

  movies[movieIndex] = updatedMovie;

  return res.status(200).json(updatedMovie);
});

app.delete('/movies/:id', (req, res) => {
  const { id } = req.params;

  const movieIndex = movies.findIndex((movie) => movie.id === id);

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' });
  }

  movies.splice(movieIndex, 1);

  return res.status(204).json({ message: 'Movie deleted' });
});

app.options('/movies/:id', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.send(200);
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
