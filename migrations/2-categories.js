module.exports.id = "categories";

module.exports.up = function (done) {
    // use this.db for MongoDB communication, and this.log() for logging
    const categories = this.db.collection('categories');
    categories.insert([
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
    const categories = this.db.collection('categories');
    categories.remove({}, done);
};
