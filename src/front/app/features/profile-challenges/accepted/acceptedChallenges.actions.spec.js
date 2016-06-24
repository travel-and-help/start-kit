const proxyquire = require('proxyquire').noCallThru();
import { ACCEPTED } from '../challengeStatus';
import { ACCEPTED_CHALLENGES_RECEIVED } from './acceptedChallenges.actions';

describe('features/profile-challenges/accepted/acceptedChallenges.actions', () => {
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

        sut = proxyquire('./acceptedChallenges.actions', {
            '../profileChallengesService': profileChallengesService
        });
    });

    describe('load', () => {

        beforeEach(() => {
            result = sut.load()(dispatch);
        });

        it('should load accepted challenges', () => {
            profileChallengesService.getChallengesByStatus(ACCEPTED);
        });

        it('should dispatch action when challenges received', () => result.then(() => {
            dispatch.should.calledWith({
                type: ACCEPTED_CHALLENGES_RECEIVED,
                challenges: getChallengesByStatusResult
            });
        }));

    });

});
