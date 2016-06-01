import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import IconButton from './../../../common/components/buttons/IconButton';

const ChallengeDetails = ({ challenge }) => {
    const {
        image,
        title,
        level,
        description,
        user: {
            firstName,
            lastName,
            rating
        }
    } = challenge.toJS();

    return (
        <section>
            <div
              className="challenge__img"
              style={{ backgroundImage: `url(${image})` }}
            >
            </div>

            <div className="challenge-info">

                <div className="challenge-info__item challenge-info__item_created">
                    <h1 className="challenge-info__title">{title}</h1>
                    <div className="challenge-info-author">
                        <span className="challenge-info-author__label">Created by </span>
                        <span className="challenge-info-author__name">
                            {firstName} {lastName}
                        </span>
                        <span className="challenge-info-author__rating">
                            <i className="icon icon_size-36">star_border</i>
                            <sup className="challenge-info-author__rating-val">
                                {rating}
                            </sup>
                        </span>
                    </div>
                    <div className="challenge-info-level">
                        <span className="challenge-info-level__label">Challenge Level </span>
                        <span className="challenge-info-level__value">{level}</span>
                    </div>
                </div>

                <IconButton
                  title={'accept challenge'}
                  buttonClassName={'challenge-info__button'}
                  iconName={'check_circle'}
                  iconSize={32}
                />

                <div className="challenge-info__item challenge-info__item_completed">
                    <p className="challenge-info-completed__count"><b>Completed by 25 people</b></p>
                    <p className="challenge-info-completed__this-week">3 this week</p>
                    <a className="challenge-info-completed__see-more" href="">See more details</a>
                </div>

                <IconButton
                  title={'share challenge'}
                  buttonClassName={'challenge-info__button'}
                  iconName={'share'}
                  iconSize={32}
                />

                <p className="challenge-info__description">{description}</p>
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
        user: ImmutablePropTypes.mapContains({
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
            rating: PropTypes.number.isRequired
        }).isRequired
    }).isRequired
};

export default ChallengeDetails;
