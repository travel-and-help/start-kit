'use strict';

const
    mongoose = require('mongoose'),
    q = require('q'),
    connect = require('./connect');

mongoose.Promise = q.Promise;

module.exports = connect;
