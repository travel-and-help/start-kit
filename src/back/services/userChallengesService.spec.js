'use strict';

const proxyquire = require('proxyquire').noCallThru();

describe('services/userChallengesService', () => {
    const challengesServiceFindRangeResult = 'challengesServiceFindRangeResult';

    let sut,
        challengesService;

    beforeEach(() => {
        challengesService = {
            findRange: env.stub().returns(challengesServiceFindRangeResult)
        };

        sut = proxyquire('./userChallengesService', {
            './challengesService': challengesService
        });
    });

    describe('get challenges by status name', () => {
        const status = 'status';
        let user$;
        let result;

        beforeEach(() => {
            user$ = env.stubChain([
                'findOne',
                'select',
                'then'
            ]);

            result = sut.getByStatus(user$, status);
        });

        it('should find user challenges by status', () => {
            user$.findOne.should.calledWith('challenges.status', status);
        });

        it('should select challenges', () => {
            user$.select.should.calledWith('challenges');
        });

        it('should return query result', () => {
            result.should.equal(user$);
        });

        context('when user challenges received', () => {
            const r = {
                challenges: [{
                    challenge: '1'
                }, {
                    challenge: '2'
                }]
            };

            beforeEach(() => {
                result = user$.then.lastCall.args[0](r);
            });

            it('should populate challenges', () => {
                challengesService.findRange.should.calledWith(['1', '2']);
            });

            it('should resolve list of selected challenges', () => {
                result.should.equal(challengesServiceFindRangeResult);
            });
        });

    });

});
