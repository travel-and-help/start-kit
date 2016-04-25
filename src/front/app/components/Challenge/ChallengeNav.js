import React from 'react';
import { hashHistory } from 'react-router';
import IconButton from './../IconButton';

export default () => (
    <div>
        <IconButton
            title={'Back'}
            buttonClassName={'challenge__back'}
            iconClassName={'icon icon-back'}
            clickHandler={hashHistory.goBack}
        />
        <IconButton
            title={'Add to watch list'}
            buttonClassName={'challenge__add-watch'}
            iconClassName={'icon icon-add-watch'}
        />
    </div>
);
