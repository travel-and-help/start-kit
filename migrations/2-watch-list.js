module.exports.id = "watch-list";

module.exports.up = function (done) {
    const challenges = this.db.collection('challenges');
    const users = this.db.collection('users');
    const errorPrefix = 'Watch List migration failed:';

    challenges.findOne({}, (err, result) => {
        if (err) {
            throw new Error(`${errorPrefix} ${err.message}`);
        }
        if (!result) {
            throw new Error(`${errorPrefix} unable to find any challenges`);
        }
        users.update(
            {},
            { $push: { watchList: result._id } },
            { upsert: true, multi: false},
            done
        );
    });
};

module.exports.down = function (done) {
    const users = this.db.collection('users');
    users.remove({}, done);
};
