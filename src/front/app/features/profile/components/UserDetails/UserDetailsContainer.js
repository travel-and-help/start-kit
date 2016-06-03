import React, { PropTypes } from 'react';
//  import Stats from './Stats';
import ImmutablePropTypes from 'react-immutable-proptypes';

const UserDetailsContainer = ({ user }) => {
    const {
        photo,
        firstName,
        rating } = user.toJS();
    return (
        <section className="user" >
            <ul className="user__info" >
                <li className="user__info__item" >
                    <img className="user__image" src={photo} title={firstName} />
                </li>
                <li className="user__info__item user__info__item--rate" >
                    <span className="sprite sprite-rate" >{rating}</span>
                </li>
            </ul>

            <h2 className="user__name" >{firstName}</h2>
        </section>
    );
};

//  <Stats stats={user.stats} />


UserDetailsContainer.propTypes = {
    user: ImmutablePropTypes.mapContains({
        firstName: PropTypes.string.isRequired,
        photo: PropTypes.string,
        rating: PropTypes.number
        //  stats: PropTypes.list
    }).isRequired
};

export default UserDetailsContainer;
