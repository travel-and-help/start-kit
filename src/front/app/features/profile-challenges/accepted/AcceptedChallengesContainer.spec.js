const proxyquire = require('proxyquire').noCallThru();

describe('AcceptedChallengesContainer', () => {
    const ProfileChallengeList = 'ProfileChallengeList';
    const connectResult = 'connectResult';

    let sut,
        mapStateToProps,
        mapDispatchToProps,
        load;

    beforeEach(() => {

        load = env.stub();

        sut = proxyquire('./AcceptedChallengesContainer', {
            'react-redux': {
                connect
            },
            './acceptedChallenges.actions': {
                load
            },
            '../ProfileChallengeList': ProfileChallengeList,
            '../../../common/components/loadable': env.stub().returnsArg(0)
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
                acceptedChallenges: 'acceptedChallenges'
            };

            result = mapStateToProps(state);
        });

        it('should show accepted challenges', () => {
            result.challenges.should.equal(state.acceptedChallenges);
        });

        it('should show accepted title in menu', () => {
            result.menuTitle.should.equal('accepted');
        });

    });

    describe('actions', () => {

        let dispatch;

        beforeEach(() => {
            dispatch = env.stub();
            sut = mapDispatchToProps(dispatch);
        });

        it('should load accepted challenges on load', () => {
            load.returns('loadAction');
            sut.onLoad();
            dispatch.should.calledWith('loadAction');
        });

    });

    function connect(_mapStateToProps, _mapDispatchToProps) {
        mapStateToProps = _mapStateToProps;
        mapDispatchToProps = _mapDispatchToProps;
        return env.spy((c) => {
            c.should.equal(ProfileChallengeList);
            return connectResult;
        });
    }

});
