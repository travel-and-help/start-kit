module.exports.id = "watch-list";

const mongoose = require('mongoose');
const challenges = require(`${process.cwd()}/src/back/controllers/api/models/challenge`);
const User = require(`${process.cwd()}/src/back/controllers/api/models/user`);

module.exports.up = function (done) {
    'use strict';

    mongoose.set('debug', true);
    mongoose.connect('mongodb://localhost/TravelAndHelp');
    mongoose.connection
        .on('connected', () => console.log('Mongoose has connected'))
        .on('error', err => console.log(`Mongoose connection error  ${err}`))
        .on('disconnected', () => console.log('Mongoose has been disconnected'));

    challenges.findOne({}, (err, challenge) => {
        const errorPrefix = 'Watch List migration failed:';
        if (err) {
            throw new Error(`${errorPrefix} ${err.message}`);
        }
        if (!challenge) {
            throw new Error(`${errorPrefix} unable to find any challenges`);
        }

        console.log('challenge has been found');
        const user = new User({
            firstName: 'Viktor',
            wishList: [challenge],
            rating: 1,
            lastLogin: Date.now(),
            registerDate: Date.now(),
            lastName: 'Milchhunderd'
        });

        user.save()
            .then(tearDown)
            .catch(error => {
                console.log(error);
                tearDown();
            });

        function tearDown() {
            mongoose.connection.close(() => process.exit(0));
            done();
        }
    });
};

module.exports.down = function (done) {
    this.db.collection('users').remove({}, done);
};
