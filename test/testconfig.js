'use strict';

const
    chai = require('chai'),
    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    deepFreeze = require('deep-freeze');

global.env = null;
global.sinon = sinon;
global.deepFreeze = deepFreeze;
chai.should();

chai.use(sinonChai);

beforeEach(() => {
    global.env = sinon.sandbox.create();
});

afterEach(() => {
    global.env.restore();
});
