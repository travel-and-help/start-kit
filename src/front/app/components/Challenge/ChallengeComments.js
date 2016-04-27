import React from 'react';
import IconButton from './../IconButton';

const ChallengeComments = () => (
    <div className="challenge-detail-comments">
        <div className="challenge-detail-comments__title">View all 245 comments</div>
        <div className="challenge-detail-comments-block">
            <span className="challenge-detail-comments-block__comment-creator">crazydriller96</span>
            <span className="challenge-detail-comments-block__comment">Already completed! Was too easy, need MORE points! GIVE ME MY POINTS! </span>

            <footer className="challenge-detail-comments-input">
                <input className="challenge-detail-comments-input__input-comment" type="text" />
                <IconButton
                    buttonClassName={'challenge-detail-comments-input__send-comment'}
                    iconName={'message'}
                    iconSize={24}
                />
            </footer>
        </div>
    </div>
);

export default ChallengeComments;
