import React from 'react';
import IconButton from './../../../common/components/buttons/IconButton';
import Fasteners from './../../../common/components/fasteners/Fasteners';

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
            <Fasteners className="challenge-comments-form__fasteners" />
            <input className="challenge-comments-form__input"
                   type="text"
                   placeholder="Tap to write comment"
            />

            <IconButton
                buttonClassName={'challenge-comments-form__submit'}
                iconName={'message'}
                iconSize={40}
                buttonType={'submit'}
            />
        </form>
    </div>

);

export default ChallengeComments;
