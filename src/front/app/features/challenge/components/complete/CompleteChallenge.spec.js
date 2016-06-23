import React from 'react';
import proxyquire from 'proxyquire';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import Header from '../../../../common/components/header/header';
import ChallengeList from '../../../../common/components/challenge/ChallengeTileList';

describe('features/challenge/components/complete/CompleteChallenge', () => {
    let CompleteChallenge,
        reactRedux,
        wrapWithConnect,
        challengeActionCreator,
        reactRouter,
        dispatch,
        params,
        sut;

    beforeEach(() => {

        dispatch = env.stub();

        wrapWithConnect = env.spy((component) => component);

        reactRedux = {
            connect: env.spy(() => wrapWithConnect)
        };

        challengeActionCreator = {
            completeChallenge: env.stub(),
            fetchSimilarChallenge: env.stub()
        };

        reactRouter = {
            hashHistory: {
                goBack: env.stub()
            }
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

        sut = mount(<CompleteChallenge
            dispatch={dispatch}
            params={params}
            challenge={challenge}
        />);
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

    it('should complete challenge on form submit', () => {
        sut.find('form').simulate('submit');
        challengeActionCreator.completeChallenge.should.calledWith('id');
    });

    it('should render similar challenges', () => {
        sut.find('.challenge-tile-info__title')
            .text().should.equal('test');
    });
});
