import React from 'react';
import Social from './Social';
import ImmutablePropTypes from 'react-immutable-proptypes';

const SocialList = ({ socials }) => (
  <ul className="section-container__social" >
      {socials.map((social, index) => (
          <Social
            key={index}
            { ... social }
          />
      ))}
  </ul>
);

SocialList.propTypes = {
    socials: ImmutablePropTypes.list.isRequired
};

export default SocialList;
