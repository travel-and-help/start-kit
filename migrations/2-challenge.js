module.exports.id = "challenge";

module.exports.up = function (done) {
    // use this.db for MongoDB communication, and this.log() for logging
    const challenge = this.db.collection('challenge');
    challenge.insert([
        {
            id: 0,
            category: ['Animals'],
            title: 'Pokormi Bomzha',
            image: 'https://dl.dropboxusercontent.com/u/18882037/challenge/random/p14.jpg',
            level: 'hard',
            user: {
                firstName: 'Anton',
                lastName: 'Golubev',
                rating: 9
            },
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {
            id: 1,
            category: ['Animals', 'Environment'],
            title: 'Oden Bomzha',
            image: 'https://dl.dropboxusercontent.com/u/18882037/challenge/random/p10.jpg',
            level: 'moderate',
            user: {
                firstName: 'Igor',
                lastName: 'Uhor',
                rating: 6
            },
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {
            id: 2,
            category: ['Social'],
            title: 'Poveseli Bomzha',
            image: 'https://dl.dropboxusercontent.com/u/18882037/challenge/random/p18.jpg',
            level: 'easy',
            user: {
                firstName: 'Alex',
                lastName: 'Torsk',
                rating: 3
            },
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        }
    ], done);
};

module.exports.down = function (done) {
    // use this.db for MongoDB communication, and this.log() for logging
    const challenge = this.db.collection('challenge');
    challenge.remove({}, done);
};
