'use strict';

const router = require('express').Router;
const challenge = require('./models/challenge');

module.exports = router()
    .get('/challenges', function(req, res){
        challenge.find(function(err, challenges){
            res.send(challenges);
        })
    });
