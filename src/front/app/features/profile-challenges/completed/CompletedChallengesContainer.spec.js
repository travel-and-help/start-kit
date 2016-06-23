const proxyquire = require('proxyquire').noCallThru();

describe('CompletedChallengesContainer', () => {
    const ProfileChallengeList = 'ProfileChallengeList';
    const connectResult = 'connectResult';

    let sut,
        mapStateToProps;

    beforeEach(() => {

        sut = proxyquire('./CompletedChallengesContainer', {
            'react-redux': {
                connect
            },
            '../ProfileChallengeList': ProfileChallengeList
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
                completedChallenges: 'completedChallenges'
            };

            result = mapStateToProps(state);
        });

        it('should show completed challenges', () => {
            result.challenges.should.equal(state.completedChallenges);
        });

        it('should show completed title in menu', () => {
            result.menuTitle.should.equal('completed');
        });

    });

    function connect(_mapStateToProps) {
        mapStateToProps = _mapStateToProps;
        return env.spy((c) => {
            c.should.equal(ProfileChallengeList);
            return connectResult;
        });
    }

});
