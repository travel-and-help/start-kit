import Index from './index';

describe('component/challenges', () => {
    let sut;

    beforeEach(() => {
        sut = new Index();
        env.spy(sut, 'setState');
        env.spy(sut, 'render');
    });

    it('should set menu`s initial class', () => {
        sut.state.isMenuActive.should.equal(false);
    });

    it('should change menu`s class if scrollTop appears', () => {
        const fakeEvent = {
            preventDefault() {},
            target: {
                scrollTop: 1
            }
        };

        sut.onScroll(fakeEvent);

        sut.setState.should.been.calledWith({
            isMenuActive: true
        });
    });

    it('should change menu`s class if NO scrollTop', () => {
        const fakeEvent = {
            preventDefault() {},
            target: {
                scrollTop: 0
            }
        };

        sut.onScroll(fakeEvent);

        sut.setState.should.been.calledWith({
            isMenuActive: false
        });
    });

    it('should render something', () => {
        const component = sut.render();
        sinon.assert.match(component, sinon.match.object);
    });
});
