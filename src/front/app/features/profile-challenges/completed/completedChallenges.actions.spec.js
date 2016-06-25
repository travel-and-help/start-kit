const proxyquire = require('proxyquire').noCallThru();
import { COMPLETED } from '../challengeStatus';
import { COMPLETED_CHALLENGES_RECEIVED } from './completedChallenges.actions';

describe('features/profile-challenges/completed/completedChallenges.actions', () => {
    const getChallengesByStatusResult = 'getChallengesByStatusResult';

    let sut,
        dispatch,
        profileChallengesService,
        result;

    beforeEach(() => {
        dispatch = env.stub().returnsArg(0);

        profileChallengesService = {
            getChallengesByStatus: env.stub().resolves(getChallengesByStatusResult)
        };

        sut = proxyquire('./completedChallenges.actions', {
            '../profileChallengesService': profileChallengesService
        });
    });

    describe('load', () => {

        beforeEach(() => {
            result = sut.load()(dispatch);
        });

        it('should load completed challenges', () => {
            profileChallengesService.getChallengesByStatus(COMPLETED);
        });

        it('should dispatch action when challenges received', () => result.then(() => {
            dispatch.should.calledWith({
                type: COMPLETED_CHALLENGES_RECEIVED,
                challenges: getChallengesByStatusResult
            });
        }));

    });

});
