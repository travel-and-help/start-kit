'use strict';

const categoryModel = require('../../../../models/category');
const userModel = require('../../../../models/user');

const getAll = (req, res, next) => {
    categoryModel.find({}, (err, categories) => {
        if (err) {
            next(err);
        } else {
            res.json(categories);
        }
    });
};

const getUserSavedCategories = (req, res, next) => {
    categoryModel.find({}, (err, foundCategories) => {
        if (err) {
            next(err);
        } else {
            const userId = req.user._id;
            let categories;

            userModel.findById(userId, (error, user) => {
                if (error) {
                    next(error);
                } else {
                    categories = checkUserSavedCategories(user, foundCategories);

                    res.json(categories);
                }
            });
        }
    });
};

const save = (req, res, next) => {
    const userId = req.user._id;
    const categoryIds = getCategoryIds(req.body);

    userModel.find({ _id: userId }).update({
        categories: categoryIds
    }, (err) => {
        if (err) {
            next(err);
        } else {
            res.json({ saved: true });
        }
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

function checkUserSavedCategories(user, foundCategories) {
    return foundCategories.map((category) => {
        if (user.categories.indexOf(category._id) > -1) {
            return {
                _id: category._id,
                name: category.name,
                checked: true
            };
        }

        return category;
    });
}

module.exports = {
    getAll,
    getUserSavedCategories,
    save
};
