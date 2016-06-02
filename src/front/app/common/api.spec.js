const proxyquire = require('proxyquire').noCallThru();

describe('app/common/api', () => {
    let sut,
        localStorage,
        reactRouter,
        fetchResult,
        api;

    beforeEach(() => {

        reactRouter = {
            hashHistory: env.stub()
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

    it('should prefix url with base api url when pass url as context', () => {
        const context = '/my-url';
        const options = {
            key: 'val'
        };
        sut(context, options);
        fetch.should.been.calledWith('/base-url/my-url', options);
    });

    it('should return response promise', () => {
        sut({}).then((result) => {
            result.should.equal(fetchResult);
        });
    });

    it('should add authorization header if token exists', () => {
        localStorage.get.returns('authToken');
        sut('/testUrl');
        fetch.should.been.calledWith('/base-url/testUrl', {
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

    it('should redirect to login if unauthenticated', () => {
        fetchResult = {
            status: 401,
            statusText: 'test error'
        };
        global.fetch = env.stub().returns(env.stub().resolves(fetchResult)());
        sut({})
            .finally(() => {
                reactRouter.hashHistory.should.calledWith('login');
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

    it('populates status error through a promise chain', done => {
        const onError = env.stub();
        const response = {
            statusText: 'some text',
            status: 300
        };
        global.fetch = env.stub().returns(env.stub().resolves(response)());
        sut({}).catch(onError);
        setTimeout(() => {
            onError.should.calledWith(
                env.match(value => value.toString().indexOf(response.statusText) > -1)
            );
            done();
        }, 1);
    });
});
