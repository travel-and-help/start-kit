import React from 'react';

const AddAndAcceptButton = ({ text, icon }) => (
    <button className="add-accept-button">
        <span className="add-accept-button__icon"><img src="" title="logo" />{icon}</span>
        {text}
    </button>
);

const ChallengeCreatedInfo = ({ challenge_title, created_by_title, created_by, rating, challenge_level_title, challenge_level }) => (
    <section className="challenge-created-info">
        <div className="challenge-created-info__challenge-title">pokormi bomzha {challenge_title}</div>
        <div className="challenge-created-info__created-by-line">
            <span className="challenge-created-info__created-by-title">Created by {created_by_title}</span>
            <span className="challenge-created-info__created-by"> Anton Golubev {created_by}</span>
            <span className="challenge-created-info__rating"><img src="" title="rating" />{rating}</span>
        </div>
        <div className="challenge-created-info__created-by-line">
            <span className="challenge-created-info__challange-level-title">Challenge Level {challenge_level_title}</span>
            <span className="challenge-created-info__challange-level">Hard {challenge_level}</span>
        </div>
    </section>
);

const ChallengeCompletedInfo = ({ completed_by, weeks, more_details }) => (
    <div className="challenge-completed-info">
        <div className="challenge-completed-info__completed-by">Completed by 25 people {completed_by}</div>
        <div className="challenge-completed-info__weeks">3 this week {weeks}</div>
        <div className="challenge-completed-info__more-details"><a href="">See more details {more_details}</a></div>
    </div>
);

const ChallengeDescription = ({ description }) => (
    <div className="challenge-description"> {description} Description is one of four rhetorical modes (also known as modes of discourse), along with exposition, argumentation, and narration. Each of the rhetorical modes is present in a variety of forms and each has its own purpose and conventions. The act of description may be related to that of definition. Description is also the fiction-writing mode for transmitting a mental image of the particulars of a story.[citation needed] Definition: The pattern of development that presents a word picture of a thing, a person, a situation, or a series of events. Fiction is a form of narrative, one of the four rhetorical modes of discourse. Fiction-writing also has modes for fiction-writing: action, exposition, description, dialogue, summary, and transition (Morrell 2006, p. 127)</div>

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
