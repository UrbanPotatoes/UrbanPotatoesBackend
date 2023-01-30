"use strict";

const mongoose = require("mongoose");

const { Schema } = mongoose;

const movieSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  poster: { type: String, required: true },
  video: { type: Boolean, required: true },
});

const movieModel = mongoose.model("movie", movieSchema);

module.exports = movieModel;
