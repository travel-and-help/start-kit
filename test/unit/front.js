'use strict';

const load = require('./load');
const layout = require('../../layout');
const chai = require('chai');
const chaiEnzyme = require('chai-enzyme');
const jsdom = require('jsdom');

chai.use(chaiEnzyme());

const _document = jsdom.jsdom('<!doctype html><html><body></body></html>');
const _window = _document.defaultView;

Object.keys(_window).forEach((key) => {
    if (!(key in global)) {
        global[key] = _window[key];
    }
});

global.document = _document;
global.window = _window;


load(layout.src.frontDir);
