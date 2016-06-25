'use strict';

const Challenge = require('../models/challenge');

const service = {
    findRange,
    find
};

module.exports = service;

function findRange($in) {
    return service.find({
        _id: { $in }
    });
}

function find(query) {
    return Challenge.find(query)
        .populate('user');
}
