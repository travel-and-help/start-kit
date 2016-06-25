import React from 'react';
import { shallow } from 'enzyme';
import ChallengeCount from './ChallengeCount';
import ChallengeStats from './ChallengeStats';

describe('ChallengeStats', () => {
    let sut,
        props;

    beforeEach(() => {
        props = {
            acceptedCount: 100500,
            createdCount: 100,
            completedCount: 99
        };

        sut = shallow(<ChallengeStats { ...props } />);
    });

    it('should show accepted challenges stats', () => {
        sut.should.contain(<ChallengeCount count={props.acceptedCount} status={'accepted'} />);
    });

    it('should show completed challenges stats', () => {
        sut.should.contain(<ChallengeCount count={props.completedCount} status={'completed'} />);
    });

    it('should show created challenges stats', () => {
        sut.should.contain(<ChallengeCount count={props.createdCount} status={'created'} />);
    });
});
