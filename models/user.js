'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  email:{ type: String, required: true },
  favoritelist:{ type: String, required: true },
  watchlaterlist:{ type: String, required: true },
  watchedlist:{ type: String, required: true },
});

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;
