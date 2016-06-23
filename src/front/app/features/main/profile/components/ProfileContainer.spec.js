const proxyquire = require('proxyquire').noCallThru();

describe('ProfileContainer', () => {
    const Profile = 'Profile';

    let sut,
        loadable,
        reactRedux,
        dispatch,
        wrapWithConnect,
        profileActions,
        watchListActions;

    beforeEach(() => {
        dispatch = env.stub();

        wrapWithConnect = env.stub().returns({});

        reactRedux = {
            connect: env.stub().returns(wrapWithConnect)
        };

        profileActions = {
            load: env.stub().returns(Symbol())
        };


        watchListActions = {
            navigate: env.stub().returns('navigateToWatchList')
        };

        loadable = env.stub().returnsArg(0);

        sut = proxyquire('./ProfileContainer', {
            '../../../../common/components/loadable': loadable,
            'react-redux': reactRedux,
            '../profile.actions': profileActions,
            './Profile': Profile,
            '../../../profile-challenges/watch-list/watchList.actions': watchListActions
        });
    });

    it('should map state user to props user', () => {
        const profile = {};
        const state = {
            profile
        };
        reactRedux.connect.getCall(0).args[0](state).should.contains({ profile });
    });

    it('should load profile on component load', () => {
        const props = reactRedux.connect.getCall(0).args[1](dispatch);
        props.onLoad();
        dispatch.should.calledWith(profileActions.load());
    });

    it('should navigate to watch list when user click on it', () => {
        const props = reactRedux.connect.getCall(0).args[1](dispatch);
        props.onWatchListClick();
        dispatch.should.calledWith(watchListActions.navigate());
    });

    it('should map to props once', () => {
        reactRedux.connect.should.callCount(1);
    });

    it('should wrap Profile component', () => {
        wrapWithConnect.should.calledWith(Profile)
            .and
            .callCount(1);
    });

    it('should return react-redux container', () => {
        sut.default.should.equal(wrapWithConnect());
    });
});
