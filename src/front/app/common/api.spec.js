const proxyquire = require('proxyquire').noCallThru();

describe('app/common/api', () => {
    let sut,
        localStorage,
        reactRouter,
        fetchResult,
        api;

    beforeEach(() => {

        reactRouter = {
            push: env.stub()
        };

        localStorage = {
            get: env.stub()
        };

        fetchResult = {
            status: 200,
            statusText: 'test error',
            json: env.stub()
        };

        global.fetch = env.stub().returns(env.stub().resolves(fetchResult)());
        process.env.API_BASE_URL = '/base-url';
        api = proxyquire('./api', {
            './local-storage': localStorage,
            'react-router': reactRouter
        });
        sut = api.default;
    });

    it('should prefix url with base api url when pass object', () => {
        const context = {
            url: '/my-url',
            otherInfo: 'other info'
        };
        sut(context);
        fetch.should.been.calledWith({
            url: '/base-url/my-url',
            otherInfo: context.otherInfo
        });
    });

    it('should prefix url with base api url when pass url as context', () => {
        const context = '/my-url';
        sut(context);
        fetch.should.been.calledWith('/base-url/my-url');
    });

    it('should not prefix url with base api url when not pass url in context', () => {
        const context = {
            otherInfo: 'other info'
        };
        sut(context);
        fetch.should.been.calledWith(context);
    });

    it('should not prefix url with base api url when not pass url as context', () => {
        sut();
        fetch.should.been.calledWith();
    });

    it('should return response promise', () => {
        sut({}).then((result) => {
            result.should.equal(fetchResult);
        });
    });

    it('should add authorization header if token exists', () => {
        localStorage.get.returns('authToken');
        sut({});
        fetch.should.been.calledWith({}, {
            credentials: 'include',
            headers: { Authorization: 'Bearer authToken' }
        });
    });

    it('should parse response', () => {
        const parsingResult = 'parsing result';
        fetchResult.json.returns(parsingResult);
        sut({})
            .then((response) => {
                response.should.equal(parsingResult);
            });
    });

    it('should reject if status not in range of 200 till 300', () => {
        fetchResult = {
            status: 300,
            statusText: 'test error'
        };
        global.fetch = env.stub().returns(env.stub().resolves(fetchResult)());
        sut({})
            .catch((error) => {
                error.should.be.instanceof(Error);
                error.response.should.equal(fetchResult);
            });
    });

});
