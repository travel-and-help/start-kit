import React from 'react';
import IconButton from './../IconButton';

const ChallengeDetails = ({image, category, title, level, description, user}) => (
    <section>
        <img src={image} alt="" />
        <div>{title}</div>
        <div>{level}</div>
        <IconButton
            title={'add to watch list'}
            className={'challenge__add-to-watch'}
            iconClassName={'icon icon-watch-list'}
        />
        <IconButton
            title={'accept challenge'}
            className={'challenge__accept'}
            iconClassName={'icon icon-accept'}
        />
        <div>{user && user.firstName}</div>
        <div>{user && user.lastName}</div>
        <div>{user && user.rating}</div>
        <div>{description}</div>
    </section>
);

ChallengeDetails.propTypes = {
    image: React.PropTypes.string,
    title: React.PropTypes.string,
    category: React.PropTypes.array,
    level: React.PropTypes.string,
    description: React.PropTypes.string,
    user: React.PropTypes.object
};

export default ChallengeDetails;
