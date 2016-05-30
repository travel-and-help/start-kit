import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import IconButton from './../../../common/components/buttons/IconButton';
import Fasteners from './../../../common/components/fasteners/Fasteners';

const ChallengeDetails = ({ challenge }) => {
    const {
        image,
        title,
        level,
        description,
        categories,
        location,
        user: {
            firstName,
            lastName
        }
    } = challenge.toJS();

    return (
        <section>
            <header className="challenge-header" style={{ backgroundImage: `url(${image})` }} >
                <h1 className="challenge-header__title" >{title}</h1>
            </header>

            <div className="challenge-info" >

                <div className="challenge-info__inner challenge-info__inner_big" >

                    <div className="challenge-info__item" >
                        <Fasteners className="challenge-tile-wrap__fasteners" />
                        <i className="challenge-info-category__icon icon icon_size-36" >group</i>
                        <span className="challenge-info-category__name" >{categories}</span>
                    </div>


                    <div className="challenge-info__item challenge-info__item_big" >
                        <div className="challenge-info-author" >
                            <span className="challenge-info-author__label" >Created by</span>
                        <span className="challenge-info-author__name" >
                            {firstName} {lastName}
                        </span>
                        </div>
                        <p className="challenge-info-location" >
                            <span className="challenge-info-location__label" >Region</span>
                            <span className="challenge-info-location__name" >{location}</span>
                        </p>
                    </div>

                    <div className="challenge-info__item challenge-info-level" >
                        <span className="challenge-info-level__value" >{level}</span>
                    </div>

                    <div className="challenge-info__item
                    challenge-info__item_big
                    challenge-info-completed"
                    >
                        <p className="challenge-info-completed__count" ><b>25</b> completions</p>
                    </div>
                </div>

                <div className="challenge-info__inner challenge-info__inner_small" >
                    <IconButton
                        title={'Accept'}
                        buttonClassName={'challenge-info__button'}
                        iconName={'check_circle'}
                        iconSize={32}
                    />

                    <IconButton
                        title={'Share'}
                        buttonClassName={'challenge-info__button'}
                        iconName={'share'}
                        iconSize={32}
                    />
                </div>

                <p className="challenge-info__item challenge-info__item_description">
                    {description}
                </p>
            </div>
        </section>
    );
};

ChallengeDetails.propTypes = {
    challenge: ImmutablePropTypes.mapContains({
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        level: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        categories: PropTypes.array.isRequired,
        location: PropTypes.string.isRequired,
        user: ImmutablePropTypes.mapContains({
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
};

export default ChallengeDetails;
