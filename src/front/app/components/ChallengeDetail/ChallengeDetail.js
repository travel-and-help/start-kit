import React from 'react';

const AddAndAcceptButton = ({ text, icon }) => (
    <button className="add-accept-button">
        <span className="add-accept-button__icon"><img src="" title="logo" />{icon}</span>
        {text}
    </button>
);

const ChallengeCreatedInfo = ({ challengeTitle, createdByTitle, createdBy, rating, challengeLevelTitle, challengeLevel }) => (
    <section className="challenge-created-info">
        <div className="challenge-created-info__challenge-title">pokormi bomzha {challengeTitle}</div>
        <div className="challenge-created-info__created-by-line">
            <span className="challenge-created-info__created-by-title">Created by {createdByTitle}</span>
            <span className="challenge-created-info__created-by"> Anton Golubev {createdBy}</span>
            <span className="challenge-created-info__rating"><img src="" title="rating" />{rating}</span>
        </div>
        <div className="challenge-created-info__created-by-line">
            <span className="challenge-created-info__challange-level-title">Challenge Level {challengeLevelTitle}</span>
            <span className="challenge-created-info__challange-level">Hard {challengeLevel}</span>
        </div>
    </section>
);

const ChallengeCompletedInfo = ({ completedBy, weeks, moreDetails }) => (
    <div className="challenge-completed-info">
        <div className="challenge-completed-info__completed-by">Completed by 25 people {completedBy}</div>
        <div className="challenge-completed-info__weeks">3 this week {weeks}</div>
        <div className="challenge-completed-info__more-details"><a href="">See more details {moreDetails}</a></div>
    </div>
);

const ChallengeDescription = ({ description }) => (
    <div className="challenge-description"> {description}</div>

);

export default () => (
    <div>
        <div className="challenge-detail">
            <div className="challenge-detail-header">
                <img src="" className="challenge-detail-header__back-button" title="back" />
                    <img className="challenge-detail-header__share-button" title="share" />
            </div>

            <div className="challenge-detail-info">

                <ChallengeCreatedInfo />

                <AddAndAcceptButton text="add to watch list" />

                <ChallengeCompletedInfo />

                <AddAndAcceptButton text="accept challenge" />
            </div>

            <ChallengeDescription />

            <div className="challenge-detail-comments">
                <div className="challenge-detail-comments__title">View all 245 comments</div>
                <div className="challenge-detail-comments-block">
                    <span className="challenge-detail-comments-block__comment-creator">crazydriller96</span>
                    <span className="challenge-detail-comments-block__comment">Already completed! Was too easy, need MORE points! GIVE ME MY POINTS! </span>

                    <footer className="challenge-detail-comments-input">
                        <input className="challenge-detail-comments-input__input-comment" type="text" />
                        <img className="challenge-detail-comments-input__send-comment" src="" alt="" title="send" alt="send" />
                    </footer>
                </div>
            </div>
        </div>
    </div>
);
