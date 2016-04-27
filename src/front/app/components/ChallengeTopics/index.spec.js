import proxyquire from 'proxyquire';

describe('ChallengeTopics', () => {
    let sut;
    let ChallengeTopics;
    let getChallengeTopics;
    let toggleChallengeTopic;
    let topics;
    let dispatch;
    let action;
    let connect;

    beforeEach(() => {
        topics = ['topics'];
        action = { plain: 'object' };
        getChallengeTopics = env.stub().returns(topics);
        toggleChallengeTopic = env.stub().returns(action);
        const connector = env.spy((component) => component);
        connect = env.stub().returns(connector);

        ChallengeTopics = proxyquire('./index', {
            './../../actions/challengeTopics': {
                getChallengeTopics,
                toggleChallengeTopic
            },
            'react-redux': {
                connect
            }
        }).default;

        dispatch = env.spy();
        sut = new ChallengeTopics({ dispatch });
    });

    describe('componentDidMount', () => {
        it('should pass challenge topics to dispatch', () => {
            sut.componentDidMount();
            dispatch.should.have.been.calledWith(topics);
        });
    });

    describe('handleClick', () => {
        it('should pass challenge topics to dispatch', () => {
            const topicName = 'some name';
            sut.handleClick(topicName);
            toggleChallengeTopic.should.have.been.calledWith(topicName);
        });

        it('should pass action to dispatch', () => {
            sut.handleClick();
            dispatch.should.have.been.calledWith(action);
        });
    });

    describe('mapStateToProps', () => {
        it('should map correct props to state', () => {
            const mockChallengeTopics = {
                topic: 'topic'
            };
            const testState = {
                challengeTopics: mockChallengeTopics,
                someOtherEntity: 'someOtherEntity'
            };

            const expectedState = {
                challengeTopics: mockChallengeTopics
            };

            const mapStateToProps = connect.lastCall.args[0];
            const challengeTopics = mapStateToProps(testState);

            challengeTopics.should.eqls(expectedState);
        });
    });
});
