import ChallengeScreen from './ChallengeScreen';

describe('ChallengeScreen', () => {
    let sut;

    beforeEach(() => {
        sut = new ChallengeScreen();
        env.spy(sut, 'setState');
        env.spy(sut, 'render');
    });

    xit('should set initial state for the menu bar status', () => {
        sut.state.isMenuActive.should.equal(false);
    });

    xit('should change menu`s state if scrollTop appears', () => {
        const fakeEvent = {
            preventDefault() {
            },
            target: {
                scrollTop: 1
            }
        };

        sut.onScroll(fakeEvent);

        sut.setState.should.been.calledWith({
            isMenuActive: true
        });
    });

    xit('should change menu`s state if scrollTop is 0', () => {
        const fakeEvent = {
            preventDefault() {
            },
            target: {
                scrollTop: 0
            }
        };

        sut.onScroll(fakeEvent);

        sut.setState.should.been.calledWith({
            isMenuActive: false
        });
    });
});
