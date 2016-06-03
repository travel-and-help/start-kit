'use strict';

const responseStatus = require('./response-status');

module.exports = Object.freeze({
    fail: (res, err) => {
        // eslint-disable-next-line no-console
        console.log(err);
        res
            .status(responseStatus.INTERNAL_SERVER_ERROR)
            .json({ error: err });
    },
    ok: (res, result) => {
        res.status(responseStatus.OK).json(result);
    }
});
