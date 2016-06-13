import React, { PropTypes } from 'react';
import Header from '../../../../common/components/header/header';
import ChallengeList from '../../../../common/components/challenge/ChallengeTileList';
import CompleteForm from './CompleteForm';

const CompleteChallenge = ({ similarChallenges, handleSubmit, goBack, id }) => (
    <section className="challenge-complete">
        <Header title="Challenge completed" onDiscardClick={goBack} />
        <div className="challenge-screen__content">
            <CompleteForm handleSubmit={handleSubmit} id={id} />
        </div>
        <div className="user-details__challenges-section_accepted">

            <ChallengeList challenges={ similarChallenges } />
        </div>
    </section>
);

CompleteChallenge.propTypes = {
    similarChallenges: PropTypes.arrayOf(PropTypes.object),
    handleSubmit: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired
};

export default CompleteChallenge;
