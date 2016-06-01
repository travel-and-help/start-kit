'use strict';

const sut = require('./response-builder');
const chainable = require('../../../test/unit/builders/chainable');

describe('response builder', () => {
    let res;

    beforeEach(() => {
        res = chainable(['status', 'json']);
    });

    it('sets code on success', () => {
        sut.ok(res);
        res.status.should.have.been.calledWith(200);
    });

    it('sends info on success', () => {
        const info = 'smth';
        sut.ok(res, info);
        res.json.should.have.been.calledWith(info);
    });

    it('sets code on error', () => {
        sut.fail(res);
        res.status.should.have.been.calledWith(500);
    });

    it('sends error on fail', () => {
        const error = 'ooops!';
        sut.fail(res, error);
        res.json.should.have.been.calledWith(env.match({ error }));
    });
});
