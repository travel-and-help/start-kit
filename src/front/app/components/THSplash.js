import React from 'react';

const THSplash = ({ children }) => (
<div>
    <div className="th-splash">
        <div className="th-splash__content">
            <THSplashWord className="th-splash__travel" word="Travel" />

            <div className="th-splash__and"> &</div>

            <THSplashWord className="th-splash__help" word="Help" />
        </div>
    </div>
    { children }
</div>
);

THSplash.propTypes = {
    children: React.PropTypes.element
};

const THSplashWord = ({ className, word }) => (
    <div className={`${className} th-splash-word`}>
        <span className="th-splash-word__first-letter">{word[0]}</span>
        <span className="th-splash-word__rest-word">{word.substring(1, word.length)}</span>
    </div>
);

THSplashWord.propTypes = {
    className: React.PropTypes.string,
    word: React.PropTypes.string
};

export default THSplash;
