import Challenge from './Challenge';

describe('Challenge', () => {
    let sut;

    beforeEach(() => {
        sut = new Challenge();

        sut.props = {
            getChallenge: env.stub(),
            params: {
                id: 'id'
            }
        };

        sut.componentDidMount();
    });

    it('should fetch challenge on mounting once', () => {
        sut.props.getChallenge.should.have.callCount(1);
    });

    it('should fetch challenge by id on mounting', () => {
        sut.props.getChallenge.should.have.been.calledWith(sut.props.params.id);
    });
});
