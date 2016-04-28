import React from 'react';
import IconButton from './../IconButton';

const ChallengeComments = () => (
    <div className="challenge-comments">
        <div className="challenge-comments__title">View all 245 comments</div>

        <div className="challenge-comments__item">
            <span className="challenge-comments__author">crazydriller96</span>
            <span className="challenge-comments__comment">Already completed! Was too easy, need MORE points! GIVE ME MY POINTS! </span>
        </div>

        <div className="challenge-comments__item">
            <span className="challenge-comments__author">sdfa996</span>
            <span className="challenge-comments__comment">Was too easy, need MORE points! GIVE ME MY POINTS! </span>
        </div>

        <form className="challenge-comments__form">
            <input className="challenge-comments__input" type="text" placeholder="Tap to write comment" />
            <IconButton
                buttonClassName={'challenge-comments__submit-button'}
                iconName={'message'}
                iconSize={40}
                buttonType={'submit'}
            />
        </form>
    </div>
);

export default ChallengeComments;
