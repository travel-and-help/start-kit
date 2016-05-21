"use strict";

const user = require('./../../models/user');
const challenge = require('./../../models/challenge');
const mongoose = require('mongoose');

const getChallengesByUserId = (req, res) => {
    mongoose.set('debug', true);
    user.findById(req.params.id)
        .then(onUser)
        .then(user => challenge.find({_id: user.wishList}))
        .then(challenges => res.send(challenges));

    function onUser(user) {
        if (user) {
            return user;
        }
        console.log('Can\'t find the user');
        return {wishList: []};
    }
};

module.exports = {
    getChallengesByUserId
};
