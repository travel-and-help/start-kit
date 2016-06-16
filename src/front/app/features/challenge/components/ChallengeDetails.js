import React, { PropTypes } from 'react';
import { hashHistory } from 'react-router';
import ImmutablePropTypes from 'react-immutable-proptypes';
import IconButton from './../../../common/components/buttons/IconButton';
import Fasteners from './../../../common/components/fasteners/Fasteners';

const ChallengeDetails = ({ challenge, onAccept, onComplete, currentUser }) => {
    const {
        _id,
        image,
        title,
        level,
        description,
        categories,
        location,
        user
        } = challenge.toJS();

    let actionTitle,
        actionIconName,
        clickHandler;

    if (currentUser === user._id) {
        actionTitle = 'Edit';
        clickHandler = () => hashHistory.push(`/edit/${_id}`);
        actionIconName = 'edit';
    } else if (challenge.get('isAccepted')) {
        actionTitle = 'Complete';
        clickHandler = () => onComplete(challenge.get('_id'));
        actionIconName = 'complete';
    } else {
        actionTitle = 'Accept';
        actionIconName = 'accept';
        clickHandler = () => onAccept(challenge.get('_id'));
    }
    const inlineStyle = image ? { backgroundImage: `url(${image})` } : {};
    return (
        <section>
            <header className="challenge-header" style={inlineStyle} >
                <h1 className="challenge-header__title" >{title}</h1>
            </header>

            <div className="challenge-info" >

                <div className="challenge-info__inner challenge-info__inner_big" >

                    <div className="challenge-info__item challenge-info-category" >
                        <Fasteners className="challenge-info__fasteners" />
                        {categories && categories[0] && <IconButton
                            title={categories[0]}
                            iconName={`category-${categories[0]}`.toLowerCase()}
                            iconSize={48}
                            iconClassName={'icon_dark'}
                        />}
                    </div>


                    <div className="challenge-info__item challenge-info__item_big" >
                        <Fasteners className="challenge-info__fasteners" />
                        <div className="challenge-info-author" >
                            <p className="challenge-info__label" >Created by</p>
                            <span className="challenge-info__text" >
                                {user && user.fullName}
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
                            title={actionTitle}
                            buttonClassName={'challenge-info__button'}
                            iconName={actionIconName}
                            iconSize={32}
                            iconClassName={'icon_dark'}
                            clickHandler={clickHandler}
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
    onAccept: PropTypes.func.isRequired,
    onComplete: PropTypes.func.isRequired,
    challenge: ImmutablePropTypes.mapContains({
        image: PropTypes.string,
        title: PropTypes.string,
        level: PropTypes.string,
        description: PropTypes.string.isRequired,
        categories: ImmutablePropTypes.list.isRequired,
        location: PropTypes.string.isRequired,
        user: ImmutablePropTypes.mapContains({
            fullName: PropTypes.string
        })
    }).isRequired,
    currentUser: PropTypes.string
};

export default ChallengeDetails;
