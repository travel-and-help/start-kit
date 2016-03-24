/* eslint-disable no-console */

'use strict';

const chalk = require('chalk');

module.exports = log;

function log(env) {
    console.log(chalk.green('ENV configuration'));
    logVariable(env, 'ENV');
    console.log('');
}

function logVariable(env, name) {
    Object.keys(env).forEach((variableName) => {

        const value = env[variableName];

        if (typeof value === 'object') {
            logVariable(value, `${name} ${chalk.blue(`[${variableName}]`)}`);
        } else {
            console.log(`${chalk.green(name)} ${chalk.blue(`[${variableName}]`)} : ${value}`);
        }

    });
}
