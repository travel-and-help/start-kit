import proxyquire from 'proxyquire';
import { fromJS } from 'immutable';

describe('CreateFormContainer', () => {
    let sut,
        router,
        form,
        wrapWithConnect,
        loadable,
        validate,
        CreateForm,
        innerSendChallenge,
        createActionCreators,
        challengeActionCreators,
        dispatch,
        auth,
        challenge,
        user;

    beforeEach(() => {
        challenge = fromJS({
            categories: [
                {
                    _id: 'id'
                }
            ]
        });

        dispatch = env.stub();

        wrapWithConnect = env.stub().returns({});

        user = {};

        auth = {
            get: env.stub().returns(user)
        };

        form = {
            reduxForm: env.stub().returns(wrapWithConnect)
        };

        CreateForm = {
            default: Symbol()
        };

        innerSendChallenge = env.spy();

        createActionCreators = {
            fetchCategories: env.spy(),
            sendChallenge: env.stub().returns(innerSendChallenge)
        };

        challengeActionCreators = {
            resetState: env.stub().returns({}),
            fetchChallenge: env.stub().returns({})
        };

        router = {
            push: env.stub().returns('push'),
            goBack: env.stub().returns('goBack')
        };

        loadable = env.stub().returns({});

        validate = env.stub().returns({});

        const validateWrapper = {
            default: validate
        };

        sut = proxyquire('./CreateFormContainer', {
            'react-router-redux': router,
            'redux-form': form,
            '../../../common/components/loadable': loadable,
            './validate': validateWrapper,
            './CreateForm': CreateForm,
            '../create.actions': createActionCreators,
            '../../challenge/challenge.actions': challengeActionCreators
        }).default;
    });

    it('should map state props', () => {
        const categories = {};
        const state = { categories, auth, challenge };
        const initialValues = {
            ...challenge.toJS(),
            category: 'id',
            user
        };
        const expectedState = {
            categories,
            user,
            initialValues,
            challenge
        };
        form.reduxForm.getCall(0).args[1](state).should.eqls(expectedState);
    });

    it('should map form fields and validation logic to props', () => {
        const expectedFormOptions = {
            form: 'create',
            fields: [
                'title',
                'description',
                'category',
                'startDate',
                'endDate',
                'repeateble',
                'proof',
                'user',
                'image'
            ],
            validate
        };
        form.reduxForm.getCall(0).args[0].should.eqls(
            expectedFormOptions
        );
    });

    describe('mergeProps', () => {
        const challengeId = 'challengeId';
        let componentProps;

        beforeEach(() => {
            const stateProps = { challenge, user };
            const dispatchProps = { dispatch };
            const ownProps = { challengeId };

            componentProps = form
                .reduxForm
                .getCall(0)
                .args[3](stateProps, dispatchProps, ownProps);

            componentProps.onLoad();
        });

        it('should map innerSendChallenge to props', () => {
            createActionCreators.sendChallenge.should.calledWith(challenge);
        });

        it('should NOT redirect to login if user is logged in', () => {
            const checkAssertion = () => (
                router.push.should.not.been.called
            );
            checkAssertion();
        });

        it('should fetch categories once', () => {
            createActionCreators
                .fetchCategories
                .should.been.called.and.callCount(1);
        });

        it('should fetch challenge in edit mode', () => {
            challengeActionCreators
                .fetchChallenge
                .should.been.calledWith(challengeId);
        });
    });

    it('should return react-redux container', () => {
        sut.should.equal(wrapWithConnect());
    });
});
