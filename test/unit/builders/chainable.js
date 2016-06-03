'use strict';

module.exports = function chainable(methods) {
    return methods
        .reduce((memo, key) => Object.assign(memo, { [key]: env.stub().returns(memo) }), {});
};
