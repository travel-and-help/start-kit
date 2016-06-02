import React from 'react';
import IconButton from './../../../common/components/buttons/IconButton';
import Fasteners from './../../../common/components/fasteners/Fasteners';
import Fastener from './../../../common/components/fasteners/Fastener';

const ChallengeComments = () => (
    <div className="challenge-comments__wrapper">
        <div className="challenge-comments">
            <Fasteners className="challenge-comments__fasteners" />
            <h2 className="challenge-comments__title">Comments</h2>

            <div className="challenge-comments__item">
                <span className="challenge-comments__author">crazydriller96</span>
                <span className="challenge-comments__comment">
                    Already completed! Was too easy, need MORE points! GIVE ME MY POINTS!
                </span>
            </div>

            <div className="challenge-comments__item">
                <span className="challenge-comments__author">sdfa996</span>
                <span className="challenge-comments__comment">
                    Was too easy, need MORE points! GIVE ME MY POINTS!
                </span>
            </div>
        </div>

        <form className="challenge-comments-form">
            <div className="challenge-comments-form__item">
                <Fasteners className="challenge-comments-form__fasteners" />
                <input className="challenge-comments-form__input"
                       type="text"
                       placeholder="Tap to write comment"
                />
            </div>
            <div className="challenge-comments-form__item challenge-comments-form__item_submit">
                <Fastener />
                <IconButton
                    buttonClassName={'challenge-comments-form__submit'}
                    iconName={'send'}
                    iconSize={20}
                    buttonType={'submit'}
                    iconClassName={'icon_light'}
                />
            </div>
        </form>
    </div>

);

export default ChallengeComments;
