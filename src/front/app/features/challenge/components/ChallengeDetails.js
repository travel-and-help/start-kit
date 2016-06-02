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

                    <div className="challenge-info__item challenge-info-category" >
                        <Fasteners className="challenge-info__fasteners" />
                        <IconButton
                            title={categories[0]}
                            iconName={`category-${categories[0]}`.toLowerCase()}
                            iconSize={48}
                            iconClassName={'icon_dark'}
                        />
                    </div>


                    <div className="challenge-info__item challenge-info__item_big" >
                        <Fasteners className="challenge-info__fasteners" />
                        <div className="challenge-info-author" >
                            <p className="challenge-info__label" >Created by</p>
                            <span className="challenge-info__text" >
                                {firstName} {lastName}
                            </span>
                        </div>
                        <div className="challenge-info-location" >
                            <p className="challenge-info__label" >Region</p>
                            <span className="challenge-info__text" >{location}</span>
                        </div>
                    </div>

                    <div className="challenge-info__item challenge-info-level" >
                        <Fasteners className="challenge-info__fasteners" />
                        <span className="challenge-info__text" >{level}</span>
                    </div>

                    <div
                        className={`challenge-info__item
                        challenge-info__item_big
                        challenge-info-completed`}
                    >
                        <Fasteners className="challenge-info__fasteners" />
                        <span className="challenge-info-completed__count" >
                            <b>25</b> completions
                        </span>
                    </div>
                </div>

                <div className="challenge-info__inner challenge-info__inner_small" >
                    <div className="challenge-info__button_wrapper" >
                        <Fasteners className="challenge-info__fasteners" />
                        <IconButton
                            title={'Accept'}
                            buttonClassName={'challenge-info__button'}
                            iconName={'accept'}
                            iconSize={32}
                            iconClassName={'icon_dark'}
                            // clickHandler={hashHistory.goBack}
                        />
                    </div>

                    <div className="challenge-info__button_wrapper" >
                        <Fasteners className="challenge-info__fasteners" />
                        <IconButton
                            title={'Share'}
                            buttonClassName={'challenge-info__button'}
                            iconName={'share'}
                            iconSize={32}
                            iconClassName={'icon_dark'}
                        />
                    </div>
                </div>
            </div>
            <div className="challenge-info-description" >
                <h2 className="challenge-info-description__title" >Description</h2>
                {description}
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
        categories: ImmutablePropTypes.list.isRequired,
        location: PropTypes.string.isRequired,
        user: ImmutablePropTypes.mapContains({
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
};

export default ChallengeDetails;
