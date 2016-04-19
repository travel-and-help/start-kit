import React from 'react';

const ChallengeDetails = ({challenge}) => (
    <section>
        <img src={challenge.image} alt="" />
        <div>{challenge.name}</div>
        <div>{challenge.author}</div>
        <div>{challenge.level}</div>
    </section>
);

ChallengeDetails.propTypes = {
    challenge: React.PropTypes.object
};

export default ChallengeDetails;
