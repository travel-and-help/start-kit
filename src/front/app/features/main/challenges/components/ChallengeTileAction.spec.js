import React from 'react';
import { mount } from 'enzyme';
import ChallengeTileAction from './ChallengeTileAction';

describe('features/main/challenges/components/ChallengeTileAction', () => {
    let sut,
        props;

    beforeEach(() => {
        props = {
            type: 'type',
            text: 'text',
            onClick: env.stub()
        };
        sut = mount(<ChallengeTileAction {...props} />);
    });

    it('should style depends on type', () => {
        sut.should.have.className('challenge-tile-action_type');
    });

    it('should handle user clicks', () => {
        sut.simulate('click');
        props.onClick.should.callCount(1);
    });

    it('should show action name', () => {
        sut.find('.challenge-tile-action__text').text().should.equal(props.text);
    });

});
