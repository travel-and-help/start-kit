const proxyquire = require('proxyquire').noCallThru();
import { fromJS } from 'immutable';

describe('main/challenges/components/ChallengeTileListContainer', () => {

    let sut,
        reactRedux,
        dispatch,
        wrapWithConnect,
        challengeActions,
        ChallengeTileList,
        mapDispatchToProps;

    beforeEach(() => {
        dispatch = env.stub();

        wrapWithConnect = env.stub().returns({});

        reactRedux = {
            connect: env.stub().returns(wrapWithConnect)
        };

        challengeActions = {
            watchChallenge: env.stub().returns(Symbol())
        };

        ChallengeTileList = Symbol();

        sut = proxyquire('./ChallengeTileListContainer', {
            'react-redux': reactRedux,
            '../../../challenge/challenge.actions': challengeActions,
            '../../../../common/components/challenge/ChallengeTileList': ChallengeTileList
        }).default;

        mapDispatchToProps = reactRedux.connect.getCall(0).args[1];

    });

    it('should map dispatch watch challenhe on right left action', () => {
        const props = mapDispatchToProps(dispatch);
        const challenge = fromJS({ _id: '124' });
        props.leftSwipe.get('action')(challenge);
        dispatch.should.calledWith(challengeActions.watchChallenge('124'));
    });

    it('should wrap ChallengeTileList component', () => {
        wrapWithConnect.should.calledWith(ChallengeTileList)
            .and
            .callCount(1);
    });

    it('should return react-redux container', () => {
        sut.should.equal(wrapWithConnect());
    });
});
