'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Movie = require('./models/movie');
mongoose.connect(process.env.DB_URL);
const axios = require("axios");


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

const app = express();

// middleware
app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 3002;

app.get('/test', (request, response) => {
  response.send('test request received');
});

app.get('/movies', getMovies); 

app.get('/movies/:email', getMoviesByEmail);

app.delete('/movies/:movieID', deleteMovies);

app.post('/movies', postMovies);

app.put('/movies/:movieID', updateMovies);

async function getMoviesByEmail(request, response, next) {
  try {
    let email = request.params.email;
    const foundMovies = await Movie.find({email});
    response.status(200).send(foundMovies);
  } catch (error) {
    next(error);
  }
}

async function updateMovies(request, response, next) {
  try {
    let id = request.params.movieID;
    let data = request.body;
    let options = { new: true, overwrite: true };

    const updateMovies = await Movie.findByIdAndUpdate(id, data, options);

    response.status(200).send(updateMovies);
  } catch (error) {
    next(error);
  }
}

async function postMovies(request, response, next) {
  try {
    let createdMovie = await Movie.create(request.body);
    response.status(200).send(createdMovie);
  } catch (error) {
    next(error);
  }
}

async function deleteMovies(request, response, next) {
  console.log('inside of delete books function...serverside');
  try {
    let id = request.params.movieID;
    console.log(request.params.movieID);
    await Movie.findByIdAndDelete(id);

    response.status(200).send('Movie Deleted');
  } catch (error) {
    next(error);
  }
}

async function getMovies(request, response, next) {
  try {
    // let allMovies = await Movie.find({});
    let searchQuery = request.query.searchQuery;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}&language=en-US&page=1&include_adult=false`;

    let moviesFromAxios = await axios.get(url);
    let movieArray = moviesFromAxios.data.results;
    let movieResult = movieArray.map((movie) => new MovieParser(movie));

    response.status(200).send(movieResult);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
}

class MovieParser {
  constructor(movieObj) {
    this.movie = movieObj.title;
    this.description = movieObj.overview;
    this.poster = movieObj.poster_path;
    this.video = movieObj.video;
  }
}

app.get('*', (request, response) => {
  response.status(404).send('Not Available');
});

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
