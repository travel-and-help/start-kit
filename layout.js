'use strict';

const path = require('path');

const srcDir = path.join(__dirname, 'src');

module.exports = {
    src: {
        frontDir: path.join(srcDir, 'front'),
        backDir: path.join(srcDir, 'back')
    }
};
