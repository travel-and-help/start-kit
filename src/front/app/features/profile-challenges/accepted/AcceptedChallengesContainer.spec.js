const proxyquire = require('proxyquire').noCallThru();

describe('AcceptedChallengesContainer', () => {
    const ProfileChallengeList = 'ProfileChallengeList';
    const connectResult = 'connectResult';

    let sut,
        mapStateToProps;

    beforeEach(() => {

        sut = proxyquire('./AcceptedChallengesContainer', {
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

    function connect(_mapStateToProps) {
        mapStateToProps = _mapStateToProps;
        return env.spy((c) => {
            c.should.equal(ProfileChallengeList);
            return connectResult;
        });
    }

});
