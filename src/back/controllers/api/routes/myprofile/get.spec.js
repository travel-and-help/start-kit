'use strict';
const get = require('./get');

describe('routes/myprofile-get', () => {
    let res;

    beforeEach(() => {

        const req = {};

        res = {
            json: env.spy()
        };

        get(req, res);
    });


    it('should send mock response', () => {
        res.json.should.been.calledWith(sinon.match.object);
    });

});
