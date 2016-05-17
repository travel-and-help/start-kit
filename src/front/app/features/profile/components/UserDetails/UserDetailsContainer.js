import React, { PropTypes } from 'react';
import Stats from './Stats';
import ImmutablePropTypes from 'react-immutable-proptypes';

const UserDetailsContainer = ({ user }) => (
  <section className="user" >
      <ul className="user__info" >
          <li className="user__info__item" >
              <span className="sprite sprite-todo" ></span>
          </li>
          <li className="user__info__item" >
              <img className="user__image" src={user.photo} title={user.name} />
          </li>
          <li className="user__info__item user__info__item--rate" >
              <span className="sprite sprite-rate" >{user.rating}</span>
          </li>
      </ul>

      <h2 className="user__name" >{user.name}</h2>

      <Stats stats={user.stats} />
    </section>
);

UserDetailsContainer.propTypes = {
    user: ImmutablePropTypes.mapContains({
        name: PropTypes.string.isRequired,
        photo: PropTypes.string,
        rating: PropTypes.string,
        stats: PropTypes.list,
    }).isRequired,
};

export default UserDetailsContainer;
