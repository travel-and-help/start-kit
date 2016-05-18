'use strict';

const bodyParser = require('body-parser');
const cors = require('cors');

module.exports = (app) => app
    .use(cors())
    .use(bodyParser.json());
