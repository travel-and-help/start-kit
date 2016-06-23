'use strict';

const proxyquire = require('proxyquire').noCallThru();

describe('services/challengesService', () => {
    let sut,
        Challenge;

    beforeEach(() => {
        Challenge = env.stubChain(['find', 'populate']);
        sut = proxyquire('./challengesService', {
            '../models/challenge': Challenge
        });
    });

    describe('find range', () => {

        const ids = 'ids';
        const findResult = 'findResult';
        let result;

        beforeEach(() => {
            sut.find = env.stub().returns(findResult);
            result = sut.findRange(ids);
        });

        it('should find by passed ids', () => {
            sut.find.should.calledWith({
                _id: {
                    $in: ids
                }
            });
        });

        it('should return created query', () => {
            result.should.equal(findResult);
        });
    });

    describe('find', () => {

        const query = 'ids';
        let result;

        beforeEach(() => {
            result = sut.find(query);
        });

        it('should find by passed query', () => {
            Challenge.find.should.calledWith(query);
        });

        it('should populate challenge user', () => {
            Challenge.populate.should.calledWith('user');
        });

        it('should return created query', () => {
            result.should.equal(Challenge);
        });
    });

});
