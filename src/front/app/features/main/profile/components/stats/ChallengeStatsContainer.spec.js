const proxyquire = require('proxyquire').noCallThru();

describe('ChallengeStatsContainer', () => {
    const connectResult = 'connectResult';
    const ChallengeStats = 'ChallengeStats';

    let sut,
        mapStateToProps;

    beforeEach(() => {
        sut = proxyquire('./ChallengeStatsContainer', {
            'react-redux': {
                connect
            },
            './ChallengeStats': ChallengeStats
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
                createdChallenges: {
                    size: 100
                },
                acceptedChallenges: {
                    size: 99
                },
                completedChallenges: {
                    size: 98
                }
            };

            result = mapStateToProps(state);
        });

        it('should map created challenges count', () => {
            result.createdCount.should.equal(state.createdChallenges.size);
        });

        it('should skip map accepted challenges count', () => {
            result.acceptedCount.should.equal(state.acceptedChallenges.size);
        });

        it('should skip map completed challenges count', () => {
            result.completedCount.should.equal(state.completedChallenges.size);
        });

    });

    function connect(_mapStateToProps) {
        mapStateToProps = _mapStateToProps;
        return env.spy((c) => {
            c.should.equal(ChallengeStats);
            return connectResult;
        });
    }

});
