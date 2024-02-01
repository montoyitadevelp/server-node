import { createApp } from './main.js'
import { MovieModel } from './models/mysql/movies.js'

createApp({ movieModel: MovieModel })