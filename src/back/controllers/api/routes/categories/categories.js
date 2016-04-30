'use strict';

const category = require('./../../models/category');

const getAll = (req, res) => {
    category.find({}, (err, categories) => {
        res.json(categories);
    });
};

module.exports = {
    getAll
};
