"use strict";

const mongoose = require("mongoose");

const { Schema } = mongoose;

const profileSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  favorite: { type: String, required: true },
  watchList: { type: String, required: true },
  history: { type: String, required: true },
});

const profileModel = mongoose.model("profile", profileSchema);

module.exports = profileModel;
