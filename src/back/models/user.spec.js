'use strict';

const proxyquire = require('proxyquire').noCallThru();

describe('services/challengesService', () => {
    let sut,
        mongoose,
        mongoosePaginate,
        ObjectId;

    beforeEach(() => {
        ObjectId = function ObjectIdConstructor(id) {
            this._id = id;
        };
        mongoose = {
            Types: { ObjectId },
            Schema: function Schema(config) {
                return Object.assign({}, config, {
                    plugin: env.stub(),
                    methods: {}
                });
            },
            model: (modelName, schema) => schema
        };

        mongoosePaginate = {};

        sut = proxyquire('./user', {
            mongoose,
            'mongoose-paginate': mongoosePaginate
        });

    });

    describe('instance methods', () => {

        describe('#completeChallenge', () => {
            let userInstance;

            beforeEach(() => {
                userInstance = {
                    update: env.stub()
                };
            });

            it('should remove challenge from accepted challenges', (done) => {
                const challengeId = 'testChallengeId';
                userInstance.update.resolves();
                sut.methods.completeChallenge.call(userInstance, challengeId)
                    .then(() => {
                        userInstance.update.should.calledWith({
                            $pull: {
                                challenges: {
                                    challenge: new ObjectId('testChallengeId'),
                                    status: 'accepted'
                                }
                            }
                        });
                        done();
                    });

            });

            it('should add challenge to completed challenges', (done) => {
                const challengeId = 'testChallengeId';
                userInstance.update.resolves();
                sut.methods.completeChallenge.call(userInstance, challengeId)
                    .then(() => {
                        userInstance.update.should.calledWith({
                            $push: {
                                challenges: {
                                    challenge: new ObjectId('testChallengeId'),
                                    status: 'completed'
                                }
                            }
                        });
                        done();
                    });

            });
        });
    });
});
