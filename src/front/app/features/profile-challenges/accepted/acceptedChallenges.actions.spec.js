const proxyquire = require('proxyquire').noCallThru();
import { ACCEPTED } from '../challengeStatus';
import { ACCEPTED_CHALLENGES_RECEIVED } from './acceptedChallenges.actions';

describe('features/profile-challenges/accepted/acceptedChallenges.actions', () => {
    const getChallengesByStatusResult = 'getChallengesByStatusResult';

    let sut,
        dispatch,
        profileChallengesService,
        push,
        result;

    beforeEach(() => {
        dispatch = env.stub().returnsArg(0);

        profileChallengesService = {
            getChallengesByStatus: env.stub().resolves(getChallengesByStatusResult)
        };

        push = env.stub();

        sut = proxyquire('./acceptedChallenges.actions', {
            '../profileChallengesService': profileChallengesService,
            'react-router-redux': {
                push
            }
        });
    });

    describe('navigate', () => {
        beforeEach(() => {
            push.returns('pushAction');
            result = sut.navigate();
        });

        it('should create navigate to accepted challenges action', () => {
            push.should.calledWith('profile/accepted-challenges');
        });

        it('should return action', () => {
            result.should.equal('pushAction');
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
