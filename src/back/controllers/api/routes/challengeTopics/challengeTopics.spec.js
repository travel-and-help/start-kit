'use strict';

const proxyquire = require('proxyquire');

describe('challengeTopics handler', () => {
    let sut;
    let model;

    beforeEach(() => {
        model = {
            find: env.stub()
        };
        sut = proxyquire('./challengeTopics', {
            './../../models/challengeTopic': model
        });
    });

    it('should return all data from model', () => {
        sut.getAll();
        model.find.should.have.been.calledWith({});
    });

    it('should return data as parsed json', () => {
        const res = {json: env.stub()};
        const data = 'data';

        sut.getAll({}, res);

        const onFindCallback = model.find.lastCall.args[1];

        onFindCallback({}, data);

        res.json.should.have.been.calledWith(data);
    });
});
