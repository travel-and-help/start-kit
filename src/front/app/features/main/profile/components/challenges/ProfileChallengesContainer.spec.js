import { fromJS } from 'immutable';
const proxyquire = require('proxyquire').noCallThru();

describe('ProfileChallengesContainer', () => {

    const ProfileChallenges = 'ProfileChallenges';
    const connectResult = 'connectResult';
    const loadAction = 'loadAction';
    const navigateAction = 'navigateAction';

    let sut,
        mapStateToProps,
        mapDispatchToProps,
        profileChallengesActions,
        reactRouter;

    beforeEach(() => {

        profileChallengesActions = {
            load: env.stub().returns(loadAction),
            navigate: env.stub().returns(navigateAction)
        };

        reactRouter = {
            hashHistory: {
                push: env.stub()
            }
        };

        sut = proxyquire('./ProfileChallengesContainer', {
            'react-redux': {
                connect
            },
            '../../../../../common/components/loadable': env.stub().returnsArg(0),
            './ProfileChallenges': ProfileChallenges,
            'react-router': reactRouter,
            '../../../../profile-challenges/profileChallenges.actions': profileChallengesActions
        }).default;
    });

    it('should return connected to store component', () => {
        sut.should.equal(connectResult);
    });

    describe('props', () => {

        let state,
            result;

        beforeEach(() => {
            state = {
                createdChallenges: fromJS([1, 2, 3, 4, 5]),
                completedChallenges: fromJS([6, 7, 8, 9]),
                acceptedChallenges: fromJS([10, 11, 12, 13])
            };

            result = mapStateToProps(state);
        });

        it('should show first three created challenges', () => {
            result.created.toJS().should.deep.equal([1, 2, 3]);
        });

        it('should show first three completed challenges', () => {
            result.completed.toJS().should.deep.equal([6, 7, 8]);
        });

        it('should show first three accepted challenges', () => {
            result.accepted.toJS().should.deep.equal([10, 11, 12]);
        });

    });

    describe('actions', () => {
        let dispatch,
            result;

        beforeEach(() => {
            dispatch = env.stub();
            result = mapDispatchToProps(dispatch);
        });

        it('should load challenges', () => {
            result.onLoad();
            dispatch.should.been.calledWith(loadAction);
        });

        it('should open complete popup on left accepted action', () => {
            const challenge = fromJS({ _id: '124' });
            result.acceptedLeftSwipe.get('action')(challenge);
            reactRouter.hashHistory.push.should.calledWith('complete-challenge/124');
        });

        describe('show all click', () => {
            beforeEach(() => {
                result.onShowAllClick('status');
            });

            it('should navigate to challenges of status show all click', () => {
                profileChallengesActions.navigate.should.been.calledWith('status');
            });

            it('should dispatch navigation to challenges on show all click', () => {
                dispatch.should.been.calledWith(navigateAction);
            });
        });

    });

    function connect(_mapStateToProps, _mapDispatchToProps) {
        mapStateToProps = _mapStateToProps;
        mapDispatchToProps = _mapDispatchToProps;
        return env.spy((c) => {
            c.should.equal(ProfileChallenges);
            return connectResult;
        });
    }

});
