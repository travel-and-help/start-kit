import React from 'react';
import CreateCategories from './CreateCategories';
import { mount } from 'enzyme';
import { List } from 'immutable';

describe('CreateCategories', () => {
    let sut;
    let categoriesMock;
    let categoryMock;

    beforeEach(() => {
        categoryMock = {
            error: 'Some error',
            touched: true,
            value: ''
        };

        categoriesMock = new List([{
            name: 'test category'
        }]);

        sut = mount(<CreateCategories categories={categoriesMock} {...categoryMock} />);
    });

    it('should has error class', () => {
        sut.find('.create-category')
            .hasClass('create-category_error').should.equal(true);
    });

    it('should has a placeholder', () => {
        sut.find('.create-category__select')
            .find('option')
            .first()
            .text().should.equal('Challenge category');
    });

    it('should render an options', () => {
        sut.find('.create-category__select')
            .find('option')
            .last()
            .text().should.equal('test category');
    });
});
