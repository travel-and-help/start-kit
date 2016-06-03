import proxyquire from 'proxyquire';

describe('ProfileContainer', () => {
    let sut,
        reactRedux,
        dispatch,
        wrapWithConnect,
        profileActionCreators,
        Profile,
        userId;

    beforeEach(() => {
        userId = 'testId';

        dispatch = env.stub();

        wrapWithConnect = env.stub().returns({});

        reactRedux = {
            connect: env.stub().returns(wrapWithConnect)
        };

        profileActionCreators = {
            getUser: env.stub().returns(Symbol()),
            getChallenges: env.stub().returns(Symbol())
        };

        Profile = {
            default: Symbol()
        };

        sut = proxyquire('./ProfileContainer', {
            'react-redux': reactRedux,
            '../profile.actions': profileActionCreators,
            './Profile': Profile
        });
    });

    it('should map state user to props user', () => {
        const user = {};
        const state = {
            user,
            auth: {
                userId
            }
        };
        reactRedux.connect.getCall(0).args[0](state).should.contains({ user, userId });
    });

    it('should map dispatch to user fetching prop method', () => {
        const props = reactRedux.connect.getCall(0).args[1](dispatch);
        props.getUser(userId);
        dispatch.should.calledWith(profileActionCreators.getUser(userId));
    });

    it('should map dispatch to challenges fetching prop method', () => {
        const props = reactRedux.connect.getCall(0).args[1](dispatch);
        props.getChallenges(userId);
        dispatch.should.calledWith(profileActionCreators.getChallenges(userId));
    });

    it('should map to props once', () => {
        reactRedux.connect.should.callCount(1);
    });

    it('should wrap Profile component', () => {
        wrapWithConnect.should.calledWith(Profile.default)
            .and
            .callCount(1);
    });

    it('should return react-redux container', () => {
        sut.default.should.equal(wrapWithConnect());
    });
});
