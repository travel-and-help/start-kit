import React from 'react';
import IconButton from './../IconButton';
import {Link} from 'react-router';

const ChallengeDetails = ({image, title, level, description, user={}}) => (
    <section>
        <img src={image} alt="" />
        <div>{title}</div>
        <div>{level}</div>
        <IconButton
            title={'share challenge'}
            className={'challenge__share'}
            iconClassName={'icon icon-share'}
        />
        <IconButton
            title={'accept challenge'}
            className={'challenge__accept'}
            iconClassName={'icon icon-accept'}
        />
        <div>{user.firstName}</div>
        <div>{user.lastName}</div>
        <div>{user.rating}</div>
        <div>{description}</div>
        <Link to="challenge/1">link</Link>
    </section>
);

ChallengeDetails.propTypes = {
    image: React.PropTypes.string,
    title: React.PropTypes.string,
    level: React.PropTypes.string,
    description: React.PropTypes.string,
    user: React.PropTypes.object
};

export default ChallengeDetails;
