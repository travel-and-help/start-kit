import proxyquire from 'proxyquire';

describe('CreateFormContainer', () => {
    let sut,
        reactRedux,
        wrapWithConnect,
        CreateForm,
        createActionCreators,
        dispatch,
        auth,
        user;

    beforeEach(() => {
        dispatch = env.stub();

        wrapWithConnect = env.stub().returns({});

        user = {};

        auth = {
            get: env.stub().returns(user)
        };

        reactRedux = {
            connect: env.stub().returns(wrapWithConnect)
        };

        CreateForm = {
            default: Symbol()
        };

        createActionCreators = {
            fetchCategories: env.stub().returns({}),
            postChallenge: env.stub().returns({})
        };

        sut = proxyquire('./CreateFormContainer', {
            'react-redux': reactRedux,
            './CreateForm': CreateForm,
            '../create.actions': createActionCreators
        });
    });

    it('should map state categories and user to CreateForm props ', () => {
        const categories = {};
        const state = { categories, auth };
        reactRedux.connect.getCall(0).args[0](state).should.contains({ categories, user });
    });

    it('should map dispatch to categories fetching prop method', () => {
        const { getCategories } = reactRedux.connect.getCall(0).args[1](dispatch);
        getCategories();
        dispatch.should.calledWith(createActionCreators.fetchCategories());
    });

    it('should map dispatch to post challenge prop method', () => {
        const { postChallenge } = reactRedux.connect.getCall(0).args[1](dispatch);
        postChallenge();
        dispatch.should.calledWith(createActionCreators.postChallenge());
    });

    it('should map to props once', () => {
        reactRedux.connect.should.callCount(1);
    });

    it('should wrap CategoryTileList component', () => {
        wrapWithConnect.should.calledWith(CreateForm.default)
            .and
            .callCount(1);
    });

    it('should return react-redux container', () => {
        sut.default.should.equal(wrapWithConnect());
    });
});
