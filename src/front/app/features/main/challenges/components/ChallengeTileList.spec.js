import ChallengeTileList from './ChallengeTileList';

describe('app/features/main/challenges ChallengeTileList', () => {
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
            sut.onSwiped(challenge, 'right');
            sut.getSwipedDirection(challenge).should.equal('right');
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
                sut.onSwiped(challenge, 'right');
                sut.getSwipedDirection(challenge).should.equal('right');
            });

            context('when swipe same challenge', () => {
                it('should ignore swipe in same direction', () => {
                    sut.onSwiped(activeChallenge, activeChallengeSwipedDirection);
                    sut.getSwipedDirection(activeChallenge)
                        .should.equal(activeChallengeSwipedDirection);
                });

                it('should return to initial state when swipe in different direction', () => {
                    sut.onSwiped(activeChallenge, 'left');
                    sut.getSwipedDirection(activeChallenge).should.equal('');
                    sut.getSwipedDirection(challenge).should.equal('');
                });
            });

        });

    });
});
