module.exports.id = "challenges";

module.exports.up = function (done) {
  // use this.db for MongoDB communication, and this.log() for logging
    const challenges = this.db.collection('challenges');
    challenges.update(
        {"user" :{$exists: true}},
        {
            $set: {
                "user.fullName": 'Alex Torsk'
            },
            $unset: {
                "user.lastName": 1,
                "user.firstName": 1
            }
        },
        { multi: true }, done);
    done();
};

module.exports.down = function (done) {
  // use this.db for MongoDB communication, and this.log() for logging
  done();
};
