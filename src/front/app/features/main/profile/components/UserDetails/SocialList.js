import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Social from './Social';

const SocialList = ({ socials }) => (
    <div className="user-details__additional-list">
        {socials.map((social, index) => (
            <Social social={ social } key={ index } />
        ))}
    </div>
);

SocialList.propTypes = {
    socials: ImmutablePropTypes.listOf(ImmutablePropTypes.map).isRequired
};

export default SocialList;
