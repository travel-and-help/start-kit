module.exports.id = "challenges";

module.exports.up = function (done) {
  // use this.db for MongoDB communication, and this.log() for logging
  	const challenges = this.db.collection('challenges');
  	challenges.insert([
	    {
	        category: 'Charity',
	        description: 'Pokormi Bomzha',
	        location: 'Pechersk',
	        user: {
	            firstName: 'Anton',
	            lastName: 'Golubev',
	            rating: 9
	        }
	    },
	    {
	        category: 'Test Category 1',
	        description: 'Test Desc 1',
	        location: 'Test Loc 1',
	        user: {
	            firstName: 'First 1',
	            lastName: 'Last 1',
	            rating: 1
	        }
	    },
	    {
	        category: 'Test Category 2',
	        description: 'Test Desc 2',
	        location: 'Test Loc 2',
	        user: {
	            firstName: 'First 2',
	            lastName: 'Last 2',
	            rating: 2
	        }
	    },
	    {
	        category: 'Test Category 3',
	        description: 'Test Desc 3',
	        location: 'Test Loc 3',
	        user: {
	            firstName: 'First 3',
	            lastName: 'Last 3',
	            rating: 3
	        }
	    }
	], done);
};

module.exports.down = function (done) {
  // use this.db for MongoDB communication, and this.log() for logging
  	const challenges = this.db.collection('challenges');
  	challenges.remove({}, done);
};
