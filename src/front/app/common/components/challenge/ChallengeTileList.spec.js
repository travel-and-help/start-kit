import ChallengeTileList from './ChallengeTileList';
import { LEFT, RIGHT, NO } from './swipeDirections';

describe('app/common/components/challenge ChallengeTileList', () => {

    let sut;

    beforeEach(() => {
        sut = new ChallengeTileList();
    });

    describe('swipe challenge', () => {

        const challenge = 'myChallenge';

        beforeEach(() => {
            sut.setState = env.spy(state => {
                sut.state = state;
            });
            sut.isSwipeDirectionAvailable = env.stub();
        });

        it('should ignore swipe when direction is unavailable', () => {
            sut.onSwiped(challenge, RIGHT);
            sut.getSwipedDirection(challenge).should.not.equal(RIGHT);
        });

        it('should swipe when direction is available', () => {
            sut.isSwipeDirectionAvailable.withArgs(RIGHT).returns(true);
            sut.onSwiped(challenge, RIGHT);
            sut.getSwipedDirection(challenge).should.equal(RIGHT);
        });

        context('when persist swiped challenge', () => {

            const activeChallenge = 'swipedChallenge';
            const activeChallengeSwipedDirection = RIGHT;

            beforeEach(() => {
                sut.state = {
                    activeChallenge,
                    activeChallengeSwipedDirection
                };
            });

            context('when swipe another challenge', () => {

                it('should ignore when direction is unavailable', () => {
                    sut.onSwiped(challenge, RIGHT);
                    sut.getSwipedDirection(challenge).should.not.equal(RIGHT);
                });

                it('should swipe another challenge when direction is available', () => {
                    sut.isSwipeDirectionAvailable.withArgs(RIGHT).returns(true);
                    sut.onSwiped(challenge, RIGHT);
                    sut.getSwipedDirection(challenge).should.equal(RIGHT);
                });

            });

            it('should make swiped new challenge when swipe another challenge', () => {
                sut.onSwiped(challenge, RIGHT);
                sut.getSwipedDirection(challenge).should.not.equal(RIGHT);
            });

            context('when swipe same challenge', () => {

                it('should ignore swipe in same direction', () => {
                    sut.onSwiped(activeChallenge, activeChallengeSwipedDirection);
                    sut.getSwipedDirection(activeChallenge)
                        .should.equal(activeChallengeSwipedDirection);
                });

                it('should return to initial state when swipe in different direction', () => {
                    sut.onSwiped(activeChallenge, LEFT);
                    sut.getSwipedDirection(activeChallenge).should.equal(NO);
                    sut.getSwipedDirection(challenge).should.equal(NO);
                });
            });

        });

    });

    describe('swipe direction availability', () => {

        beforeEach(() => {
            sut.props = {
                leftSwipe: {},
                rightSwipe: {}
            };
        });

        it('left swipe should be available when challenge can be swiped right', () => {
            sut.isSwipeDirectionAvailable(LEFT).should.equal(sut.props.leftSwipe);
        });

        it('right swipe should be available when challenge can be swiped right', () => {
            sut.isSwipeDirectionAvailable(RIGHT).should.equal(sut.props.rightSwipe);
        });

    });

});
