import ChallengeTileList from './ChallengeTileList';

describe('app/components/challenge ChallengeTileList', () => {
    let sut;

    beforeEach(() => {
        sut = new ChallengeTileList();
    });

    describe('swipe', () => {
        const challenge = 'myChallenge';

        beforeEach(() => {
            sut.setState = env.spy(state => {
                sut.state = state;
            });
        });

        it('should be swiped in passed direction when no swiped element', () => {
            sut.onChallengeSwiped(challenge, 'right');
            sut.getChallengeSwipedDirection(challenge).should.equal('right');
        });

        context('when persist swiped element', () => {

            const activeChallenge = 'swipedChallenge';
            const activeChallengeSwipedDirection = 'right';

            beforeEach(() => {
                sut.state = {
                    activeChallenge,
                    activeChallengeSwipedDirection
                };
            });

            it('should make swiped new challenge when swipe another challenge', () => {
                sut.onChallengeSwiped(challenge, 'right');
                sut.getChallengeSwipedDirection(challenge).should.equal('right');
            });

            context('when swipe same challenge', () => {
                it('should ignore swipe in same direction', () => {
                    sut.onChallengeSwiped(activeChallenge, activeChallengeSwipedDirection);
                    sut.getChallengeSwipedDirection(activeChallenge)
                        .should.equal(activeChallengeSwipedDirection);
                });

                it('should return to initial state when swipe in different direction', () => {
                    sut.onChallengeSwiped(activeChallenge, 'left');
                    sut.getChallengeSwipedDirection(activeChallenge).should.equal('');
                    sut.getChallengeSwipedDirection(challenge).should.equal('');
                });
            });

        });

    });
});
