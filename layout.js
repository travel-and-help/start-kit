'use strict';

const path = require('path');

const
    srcDir = path.join(__dirname, 'src'),
    targetDir = path.join(__dirname, 'target');

const frontDir = path.join(srcDir, 'front');
const backDir = path.join(srcDir, 'back');

module.exports = {
    envFilePath: path.join(__dirname, '.env'),
    src: {
        front: {
            jsEntry: path.join(frontDir, 'index.js'),
            htmlEntry: path.join(frontDir, 'index.html'),
            stylesEntry: path.join(frontDir, 'index.scss')
        },
        frontDir,
        backDir
    },
    target: {
        buildDir: path.join(targetDir, 'build'),
        releaseDir: path.join(targetDir, 'release'),
        cordovaDir: path.join(__dirname, 'www')
    }
};
