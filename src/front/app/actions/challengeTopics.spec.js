import { getChallengeTopics, GET_CHALLENGE_TOPICS } from './challengeTopics';

describe('action/challengeTopics', () => {
    let sut;
    let dispatch;
    let fakeServerResponse;
    let mockedFetchResponse;
    let mockedChallengeTopics;

    describe('getChallengeTopics', () => {
        beforeEach(() => {
            mockedChallengeTopics = ['mockedChallengeTopics'];

            dispatch = env.spy();

            fakeServerResponse = {
                json: env.spy()
            };

            mockedFetchResponse = {
                then(fakeCallback) {
                    fakeCallback(fakeServerResponse);
                    return {
                        then(cb) {
                            cb(mockedChallengeTopics);
                        }
                    };
                }
            };

            global.fetch = env.spy(() => mockedFetchResponse);

            sut = getChallengeTopics();

        });

        it('fetch challenge topics', () => {
            sut(dispatch);

            global.fetch.should.have.been.calledWith('/api/challengeTopics').and.callCount(1);
        });

        it('should convert response to JSON', () => {
            sut(dispatch);

            fakeServerResponse.json.should.have.been.calledWith();
        });

        it('should dispatch challenge topics event with data', () => {
            sut(dispatch);

            const dispatchArgs = dispatch.lastCall.args[0];
            dispatchArgs.should.eqls({
                type: GET_CHALLENGE_TOPICS,
                challengeTopics: mockedChallengeTopics
            });
        });
    });
});
