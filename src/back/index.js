/* eslint-disable no-console */

'use strict';

const
    express = require('express'),
    bootstrap = require('./bootstrap'),
    env = require('../../env');

const app = express();

bootstrap(app)
    .listen(env.PORT, () => console.log(`back: listening on ${env.PORT}`));
