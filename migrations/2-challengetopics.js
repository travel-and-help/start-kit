module.exports.id = "challengeTopics";

module.exports.up = function (done) {
    // use this.db for MongoDB communication, and this.log() for logging
    const challengeTopics = this.db.collection('challengeTopics');
    challengeTopics.insert([
        {
            name: 'animals'
        },
        {
            name: 'environment'
        },
        {
            name: 'social'
        },
        {
            name: 'research'
        },
        {
            name: 'human rights'
        },
        {
            name: 'education'
        },
        {
            name: 'international'
        },
        {
            name: 'events'
        },
        {
            name: 'religion'
        },
        {
            name: 'health'
        },
        {
            name: 'youth'
        },
        {
            name: 'culture'
        }
    ], done);
};

module.exports.down = function (done) {
    // use this.db for MongoDB communication, and this.log() for logging
    const challengeTopics = this.db.collection('challengeTopics');
    challengeTopics.remove({}, done);
};
