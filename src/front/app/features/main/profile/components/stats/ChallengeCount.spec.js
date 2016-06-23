import React from 'react';
import { render } from 'enzyme';
import ChallengeCount from './ChallengeCount';

describe('ChallengeCount', () => {
    let sut,
        props;

    beforeEach(() => {
        props = {
            count: 100500,
            status: 'testStatus'
        };

        sut = render(<ChallengeCount { ...props } />);
    });

    it('should style regarding to status', () => {
        sut.find('.challenge-count').should.have.className('challenge-count_testStatus');
    });

    it('should show status', () => {
        sut.find('.challenge-count__status').should.have.text(props.status);
    });

    it('should show count', () => {
        sut.find('.challenge-count__value').should.have.text(props.count);
    });
});
