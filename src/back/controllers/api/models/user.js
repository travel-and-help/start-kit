'use strict';
const STATUS_ACCEPTED = 'accepted';
const STATUS_COMPLETED = 'completed';

const mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate'),
    Schema = mongoose.Schema;

const User = new Schema({
    photo: { type: String },
    fullName: {
        type: String,
        required: true
    },
    email: String,
    facebook: {
        id: {
            type: String,
            index: true
        },
        token: String
    },
    google: {
        id: {
            type: String,
            index: true
        },
        token: String
    },
    registerDate: { type: Date, default: Date.now },
    lastLogin: { type: Date, default: Date.now },
    rating: { type: Number, default: 0 },
    watchList: [{
        type: Schema.ObjectId,
        ref: 'Challenge'
    }],
    challenges: [{
        status: {
            type: String
        },
        date: {
            type: Date,
            default: Date.now
        },
        challenge: {
            type: Schema.ObjectId,
            ref: 'Challenge'
        }
    }],
    locations: {
        type: String
    },
    categories: [{
        type: Schema.ObjectId,
        ref: 'Category'
    }]
});

User.methods.completeChallenge = function completeChallenge(challengeId) {
    const model = this.model('User');
    const that = this;
    this.update({
       $pull: {
           "challenges": {
               "challenge": challengeId,
               "status": STATUS_ACCEPTED
           }
       }
   })
   .then(() => {
       return that.update({
          $push: {
              "challenges": {
                  "challenge": challengeId,
                  "status": STATUS_COMPLETED
              }
          }
      })
  });
};

User.plugin(mongoosePaginate);

module.exports = mongoose.model('User', User);
