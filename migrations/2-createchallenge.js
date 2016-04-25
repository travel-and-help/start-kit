module.exports.id = 'createChallenge';

module.exports.up = function (done) {
    const challenges = this.db.collection('challenges');

    challenges.update({}, {
       $set: { 'title': 'New Challenge Title'}
    });

    done();
};

module.exports.down = function (done) {
    const challenges = this.db.collection('challenges');

    challenges.update({}, {
        $unset: { 'title': ''}
    });

    done();
};
