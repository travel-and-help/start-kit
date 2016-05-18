const proxyquire = require('proxyquire').noCallThru();

describe('app/common/api', () => {
    let sut;

    const fetchResult = 'fetch result';

    beforeEach(() => {

        global.fetch = env.stub().returns(fetchResult);
        process.env.API_BASE_URL = '/base-url';
        sut = proxyquire('./api', {}).default;
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
        sut({}).should.equal(fetchResult);
    });

});
