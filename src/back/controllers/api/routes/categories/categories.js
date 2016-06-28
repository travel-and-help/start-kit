'use strict';

const categoryModel = require('../../../../models/category');
const userModel = require('../../../../models/user');

const getAll = (req, res, next) => {
    categoryModel
        .find({})
        .then((categories) => {
            res.json(categories);
        }, next);
};

const save = (req, res, next) => {
    const categoryIds = getCategoryIds(req.body);

    return req.getCurrentUser()
        .then((data) => {
            const userId = data._id;

            userModel
                .find({ _id: userId })
                .update({
                    categories: categoryIds
                })
                .then(() => {
                    res.json({ saved: true });
                }, next);
        }, next);
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
