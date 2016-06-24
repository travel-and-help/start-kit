'use strict';

const
    chai = require('chai'),
    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    sinonAsPromised = require('sinon-as-promised'),
    chainable = require('./builders/chainable'),
    q = require('q');

global.env = null;
global.sinon = sinon;
sinonAsPromised(q.Promise);
chai.should();

chai.use(sinonChai);

beforeEach(() => {
    global.env = sinon.sandbox.create();
    global.env.stubChain = chainable;
});

afterEach(() => {
    global.env.restore();
});
