import React from 'react';
import proxyquire from 'proxyquire';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import Header from '../../../../common/components/header/header';
import ChallengeList from '../../../../common/components/challenge/ChallengeTileList';
const q = require('q');

describe('features/challenge/components/complete/CompleteChallenge', () => {
    let CompleteChallenge,
        reactRedux,
        wrapWithConnect,
        challengeActionCreator,
        reactRouter,
        dispatch,
        params,
        mockStore,
        sut;

    beforeEach(() => {

        dispatch = env.stub();

        wrapWithConnect = env.spy((component) => component);

        reactRedux = {
            connect: env.spy(() => wrapWithConnect)
        };

        challengeActionCreator = {
            completeChallenge: env.stub(),
            fetchSimilarChallenge: env.stub(),
            watchChallenge: env.stub()
        };

        reactRouter = {
            hashHistory: {
                goBack: env.stub(),
                push: env.stub()
            }
        };
        mockStore = {
            subscribe: env.spy(),
            getState: env.stub().returns({ form: {} }),
            dispatch: env.spy()
        };

        CompleteChallenge = proxyquire('./CompleteChallenge', {
            'react-redux': reactRedux,
            '../../challenge.actions': challengeActionCreator,
            'react-router': reactRouter,
            '../../../../common/components/header/header': Header,
            '../../../../common/components/challenge/ChallengeTileList': ChallengeList
        }).default;
        params = {
            id: 'id'
        };
        const challenge = fromJS({
            similar: {
                id: {
                    docs: [{
                        _id: 'test similar item',
                        title: 'test',
                        location: 'test location',
                        user: {
                            fullName: 'test user'
                        }
                    }]
                }
            }
        });

        sut = mount(
            <Provider store={mockStore} >
                <CompleteChallenge
                    dispatch={dispatch}
                    params={params}
                    challenge={challenge}
                />
            </Provider>);
    });

    it('should contains similar challenges title', () => {
        sut.find('.challenge-complete__more-list-title')
            .text().should.equal('More challenges');
    });

    it('should redirect to previous state on back click', () => {
        sut.find('.header__discard').simulate('click');
        reactRouter.hashHistory.goBack.should.calledWith();
    });

    it('should fetch similar changes on mount', () => {
        challengeActionCreator.fetchSimilarChallenge.should.calledWith('id');
    });

    describe('#handleSubmit', () => {

        it('should complete challenge on form submit', () => {
            dispatch.resolves();
            sut.find('form').simulate('submit');
            challengeActionCreator.completeChallenge.should.calledWith('id');
        });

        it('should redirect to challenge list page on submit', () => {
            const deferred = q.defer();
            dispatch.returns(deferred.promise);
            sut.find('form').simulate('submit');
            deferred.promise.then(() => {
                reactRouter.hashHistory.push.should.calledWith('main/challenges');
            });
            deferred.resolve();
        });

    });

    describe('#watchChallenge', () => {

        it('should add challenge to watch list on left swipe', () => {
            const completeChallengeNode = sut.find('CompleteChallenge').node;
            completeChallengeNode.leftSwipe.get('type').should.equal('watch');
        });

        it('should add challenge to watch list on left swipe button click', () => {
            const completeChallengeNode = sut.find('CompleteChallenge').node;
            const swipeAction = completeChallengeNode.leftSwipe.get('action');
            swipeAction(fromJS({
                _id: 'test_id'
            }));
            challengeActionCreator.watchChallenge.should.calledWith('test_id');
        });
    });

    it('should render similar challenges', () => {
        sut.find('.challenge-tile-info__title')
            .text().should.equal('test');
    });
});
