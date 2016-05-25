import ChallengeScreen from './ChallengeScreen';

describe('ChallengeScreen', () => {
    let sut;

    beforeEach(() => {
        sut = new ChallengeScreen();
    });

    it('should fetch all challenges on mounting', () => {
        sut.props = {
            getChallenges: env.stub()
        };

        sut.componentDidMount();

        sut.props.getChallenges.should.have.callCount(1);
    });
});
