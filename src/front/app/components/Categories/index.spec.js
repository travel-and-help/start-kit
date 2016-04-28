import proxyquire from 'proxyquire';

describe('Categories', () => {
    let sut;
    let Categories;
    let getCategories;
    let toggleCategory;
    let categories;
    let dispatch;
    let action;
    let connect;

    beforeEach(() => {
        categories = ['categories'];
        action = { plain: 'object' };
        getCategories = env.stub().returns(categories);
        toggleCategory = env.stub().returns(action);
        const connector = env.spy((component) => component);
        connect = env.stub().returns(connector);

        Categories = proxyquire('./index', {
            './../../actions/categories': {
                getCategories,
                toggleCategory
            },
            'react-redux': {
                connect
            }
        }).default;

        dispatch = env.spy();
        sut = new Categories({ dispatch });
    });

    describe('componentDidMount', () => {
        it('should pass categories to dispatch', () => {
            sut.componentDidMount();
            dispatch.should.have.been.calledWith(categories);
        });
    });

    describe('handleClick', () => {
        it('should pass category to dispatch', () => {
            const categoryName = 'some name';
            sut.handleClick(categoryName);
            toggleCategory.should.have.been.calledWith(categoryName);
        });

        it('should pass action to dispatch', () => {
            sut.handleClick();
            dispatch.should.have.been.calledWith(action);
        });
    });

    describe('mapStateToProps', () => {
        it('should map correct props to state', () => {
            const mockedCategories = {
                category: 'category'
            };
            const testState = {
                categories: mockedCategories,
                someOtherEntity: 'someOtherEntity'
            };

            const expectedState = {
                categories: mockedCategories
            };

            const mapStateToProps = connect.lastCall.args[0];
            const categorieyList = mapStateToProps(testState);

            categorieyList.should.eqls(expectedState);
        });
    });
});
