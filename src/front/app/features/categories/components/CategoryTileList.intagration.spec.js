import React from 'react';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';
import CategoryTileList from './CategoryTileList';

describe('CategoryTileList', () => {
    let categoryList,
        getCategories,
        onCategoryClick,
        onSaveCategoryClick,
        wrapper;

    beforeEach(() => {
        categoryList = fromJS([{
            name: 'foo'
        }, {
            name: 'bar'
        }]);

        getCategories = env.stub();
        onCategoryClick = env.stub();
        onSaveCategoryClick = env.stub();

        wrapper = mount(<CategoryTileList
          categories={ categoryList }
          getCategories={ getCategories }
          onCategoryClick={ onCategoryClick }
          onSaveCategoryClick={ onSaveCategoryClick }
        />);
    });

    it('should render challenges in a list', () => {
        wrapper.find('li').at(0).text().should.equal(categoryList.getIn([0, 'name']));
        wrapper.find('li').at(1).text().should.equal(categoryList.getIn([1, 'name']));
    });

    it('should trigger onCategoryClick method on category tile click', () => {
        const categoryTile = wrapper.find('li').at(1);
        categoryTile.simulate('click');
        onCategoryClick.should.calledWith(categoryList.getIn([1, '_id']));
    });

    it('should pass categories to onSaveCategoryClick method save button click', () => {
        const categoryTile = wrapper.find('[data-selector="save-categories-btn"]');
        categoryTile.simulate('click');
        onSaveCategoryClick.should.calledWith(categoryList);
    });
});
