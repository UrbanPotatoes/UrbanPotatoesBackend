"use strict";

const mongoose = require("mongoose");

const { Schema } = mongoose;

const movieSchema = new Schema({
  movie: { type: String, required: true },
  description: { type: String, required: true },
  poster: { type: String, required: true },
  video: { type: Boolean, required: true },
  rating: { type: Number, required: false},
  comment: { type: Array , required: false},

});

const movieModel = mongoose.model('movie', movieSchema);

module.exports = movieModel;
