const proxyquire = require('proxyquire').noCallThru();

describe('features/profile-challenges/profileChallengesService', () => {
    const apiCallResult = 'apiCallResult';

    let sut,
        api,
        result;

    beforeEach(() => {
        api = env.stub().returns(apiCallResult);
        sut = proxyquire('./profileChallengesService', {
            '../../common/api': api
        });
    });

    describe('get challenges by status', () => {

        beforeEach(() => {
            result = sut.getChallengesByStatus('status');
        });

        it('should make request challenges by type', () => {
            api.should.calledWith('/api/my/status-challenges');
        });

        it('should delegate response handler', () => {
            result.should.equal(apiCallResult);
        });

    });

});
