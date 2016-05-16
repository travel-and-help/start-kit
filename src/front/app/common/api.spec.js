const proxyquire = require('proxyquire').noCallThru();

describe('app/common/api', () => {
    let sut;

    const fetchResult = 'fetch result';

    beforeEach(() => {

        global.fetch = env.stub().returns(fetchResult);
        process.env.API_BASE_URL = '/base-url';
        sut = proxyquire('./api', {}).default;
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
        sut({}).should.equal(fetchResult);
    });

});
