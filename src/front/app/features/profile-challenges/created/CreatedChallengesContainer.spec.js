const proxyquire = require('proxyquire').noCallThru();

describe('CreatedChallengesContainer', () => {
    const ProfileChallengeList = 'ProfileChallengeList';
    const connectResult = 'connectResult';

    let sut,
        mapStateToProps;

    beforeEach(() => {

        sut = proxyquire('./CreatedChallengesContainer', {
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
                createdChallenges: 'createdChallenges'
            };

            result = mapStateToProps(state);
        });

        it('should show created challenges', () => {
            result.challenges.should.equal(state.createdChallenges);
        });

        it('should show created title in menu', () => {
            result.menuTitle.should.equal('created');
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
