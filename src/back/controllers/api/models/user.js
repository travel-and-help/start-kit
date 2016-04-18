'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    watchList: { type: Array, required: true }
});

module.exports = mongoose.model('User', User);
