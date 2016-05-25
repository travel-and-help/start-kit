import React from 'react';
import Fasteners from '../fasteners/Fasteners';

/* istanbul ignore next */
const TopChallengeBanner = () => (
    <div className="top-challenge-banner" >
        <Fasteners className="top-challenge-banner__fasteners" />
        <div className="top-challenge-banner__content" >
            Popular this week
        </div>
    </div>
);

export default TopChallengeBanner;
