'use strict';

const user = require('./../../models/user');
const challenge = require('./../../models/challenge');
const mongoose = require('mongoose');

const getChallengesByUserId = (req, res) => {
    mongoose.set('debug', true);
    user.findById(req.params.id)
        .then(onUser)
        .then(person => challenge.find({ _id: { $in: person.get('watchList') } }))
        .then(challenges => res.json(challenges))
        .catch(err => res.error(err).send());

    function onUser(person) {
        if (person) {
            return person;
        }
        console.log('Can\'t find the user');
        return { wishList: [] };
    }
};

module.exports = {
    getChallengesByUserId
};
