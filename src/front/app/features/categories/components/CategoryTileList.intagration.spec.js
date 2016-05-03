import React from 'react';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import CategoryTileList from './CategoryTileList';

describe('CategoryTileList', () => {
    let categoryList,
        getCategories,
        onClick,
        wrapper;

    beforeEach(() => {
        categoryList = fromJS([{
            name: 'foo'
        }, {
            name: 'bar'
        }]);

        getCategories = env.stub();
        onClick = env.stub();

        wrapper = mount(<CategoryTileList
          categories={ categoryList }
          getCategories={ getCategories }
          onCLick={ onClick }
        />);
    });

    it('should render challenges in a list', () => {
        wrapper.find('li').at(0).text().should.equal(categoryList.getIn([0, 'name']));
        wrapper.find('li').at(1).text().should.equal(categoryList.getIn([1, 'name']));
    });

    it('should trigger onClick method on category tile click', () => {
        const categoryTile = wrapper.find('li').at(1);
        categoryTile.simulate('click');
        onClick.should.calledWith(categoryList.getIn([1, 'name']));
    });
});
