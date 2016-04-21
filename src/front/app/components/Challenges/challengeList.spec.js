import proxyquire from 'proxyquire';
import actions from './../../actions/challenges';

describe('component/challengeList', () => {
    const mockChallenges = [1, 2, 3];

    let sut,
        ChallengeList,
        connector,
        dispatch,
        mockFetchResponse,
        fakeServerResponse;

    beforeEach(() => {
        dispatch = env.spy();
        connector = env.spy((component) => component);
        const connect = env.stub().returns(connector);
        ChallengeList = proxyquire('./ChallengeList', {
            'react-redux': {
                connect
            }
        }).default;

        fakeServerResponse = {
            json: env.spy()
        };

        mockFetchResponse = {
            then(fakeCallback) {
                fakeCallback(fakeServerResponse);
                return {
                    then(cb) {
                        cb(mockChallenges);
                    }
                };
            }
        };

        global.fetch = env.spy(() => mockFetchResponse);
    });

    describe('no challenges', () => {
        beforeEach(() => {
            const testState = {
                challenges: [],
                dispatch
            };

            sut = new ChallengeList(testState);
        });

        it('should call async action to get initial challenges', () => {
            dispatch.should.been.calledWith(sinon.match.func).and.callCount(1);
        });

        it('should call fetch once with correct URL', () => {
            const asyncAction = dispatch.lastCall.args[0];
            asyncAction(dispatch);
            global.fetch.should.been.calledWith('/api/challenges').and.callCount(1);
        });

        it('should convert response to JSON', () => {
            const asyncAction = dispatch.lastCall.args[0];
            asyncAction(dispatch);
            const checkFakeServerResponse = () => fakeServerResponse.json.should.been.called;
            checkFakeServerResponse();
        });

        it('should call sync action with correct params', () => {
            const asyncAction = dispatch.lastCall.args[0];
            asyncAction(dispatch);
            const dispatchArgs = dispatch.lastCall.args[0];
            dispatchArgs.should.eqls({
                type: actions.getChallenges,
                challenges: mockChallenges
            });
        });
    });

    it('should NOT call async action if there are challenges already', () => {
        const testState = {
            challenges: mockChallenges,
            dispatch
        };
        sut = new ChallengeList(testState);

        const checkDispatch = () => dispatch.should.not.been.called;
        checkDispatch();
    });

    it('should render something', () => {
        const testState = {
            challenges: mockChallenges,
            dispatch
        };
        sut = new ChallengeList(testState);

        const component = sut.render();
        sinon.assert.match(component, sinon.match.object);
    });

    describe('connect', () => {
        const connectedComponent = {};
        let connect;

        beforeEach(() => {
            connector = env.spy(() => connectedComponent);
            connect = env.stub().returns(connector);
            sut = proxyquire('./ChallengeList', {
                'react-redux': {
                    connect
                }
            }).default;

        });

        it('should return connected component', () => {
            sut.should.equal(connectedComponent);
        });

        it('shoul map correct props to state', () => {
            const testState = {
                challenges: mockChallenges,
                someOtherEntity: 'someOtherEntity'
            };

            const expectedState = {
                challenges: mockChallenges
            };

            const mapStateToProps = connect.lastCall.args[0];
            const challenges = mapStateToProps(testState);

            challenges.should.eqls(expectedState);
        });
    });
});
