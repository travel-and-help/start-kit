'use strict';

const category = require('./../../models/category');
const user = require('./../../models/user');

const getAll = (req, res) => {
    category.find({}, (err, categories) => {
        res.json(categories);
    });
};

const save = (req, res) => {
    const userId = req.user._id;
    const categoryIds = getCategoryIds(req.body);

    user.find({ _id: userId }).update({
        categories: categoryIds
    }, (err) => {
        if (err) res.sendStatus(500);

        res.status(200);
    });
};

function getCategoryIds(categories) {
    const categoryIds = [];

    if (categories && categories.length) {
        categories.forEach((item) => {
            categoryIds.push(item._id);
        });
    }

    return categoryIds;
}

module.exports = {
    getAll,
    save
};
