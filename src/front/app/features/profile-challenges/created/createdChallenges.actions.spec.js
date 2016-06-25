const proxyquire = require('proxyquire').noCallThru();
import { CREATED } from '../challengeStatus';
import { CREATED_CHALLENGES_RECEIVED } from './createdChallenges.actions';

describe('features/profile-challenges/created/createdChallenges.actions', () => {
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

        sut = proxyquire('./createdChallenges.actions', {
            '../profileChallengesService': profileChallengesService
        });
    });

    describe('load', () => {

        beforeEach(() => {
            result = sut.load()(dispatch);
        });

        it('should load created challenges', () => {
            profileChallengesService.getChallengesByStatus(CREATED);
        });

        it('should dispatch action when challenges received', () => result.then(() => {
            dispatch.should.calledWith({
                type: CREATED_CHALLENGES_RECEIVED,
                challenges: getChallengesByStatusResult
            });
        }));

    });

});
