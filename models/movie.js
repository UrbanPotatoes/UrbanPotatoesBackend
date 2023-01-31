"use strict";

const mongoose = require("mongoose");

const { Schema } = mongoose;

const movieSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  poster: { type: String, required: true },
  video: { type: Boolean, required: true },
  favorite: { type: String, required: true },
  watchList: { type: String, required: true },
  history: { type: Boolean, required: true },
  email: { type: String, required: true},
  rating: { type: Number, required: true},
  comment: { type: String, required: false}

});

const movieModel = mongoose.model("movie", movieSchema);

module.exports = movieModel;
