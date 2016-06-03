'use strict';

const category = require('./../../models/category');

const getAll = (req, res) => {
    category.find({}, (err, categories) => {
        res.json(categories);
    });
};

const save = (req, res) => {
    // TODO: Implement save categories functionality
    res.sendStatus(200);
};

module.exports = {
    getAll,
    save
};
