const proxyquire = require('proxyquire').noCallThru();

const chai = require('chai'),
    expect = chai.expect;

describe('app/common/in-app-browser/WindowBrowserWrapper', () => {
    let Sut,
        windowBrowserInstance;

    beforeEach(() => {
        windowBrowserInstance = {
            close: env.stub(),
            document: {
                body: {
                    innerText: 'testBody'
                }
            },
            location: {
                href: 'testUrl'
            }
        };
        global.window.open = env.stub().returns(windowBrowserInstance);
        env.spy(global, 'setInterval');
        env.spy(global, 'clearInterval');

        Sut = proxyquire('./WindowBrowserWrapper', {}).default;
    });

    describe('instance', () => {
        let instance;

        beforeEach(() => {
            instance = new Sut('testUrl', 'testTarget', 'testConfig');
        });

        it('should open window on create', () => {
            global.window.open.should.calledWith('testUrl', 'testTarget', 'testConfig');
            expect(instance).to.be.an.instanceof(Sut);
        });

        describe('getWindow method', () => {

            it('should return browser instance', () => {
                instance.getWindow().should.equal(windowBrowserInstance);
            });

        });

        describe('close method', () => {

            it('should close browser', () => {
                instance.close();
                windowBrowserInstance.close.should.calledWith();
            });

        });

        describe('getBody method', () => {

            it('should return promise', () => {
                expect(instance.getBody()).to.be.an.instanceof(Promise);
            });

            it('should resolve with browser url', (done) => {
                instance.getBody()
                    .then((body) => {
                        body.should.equal('testBody');
                        done();
                    });
            });

        });

        describe('waitUrl method', () => {

            it('should return promise', () => {
                expect(instance.waitUrl('testUrl')).to.be.an.instanceof(Promise);
            });

            it('should resolve if browser url is same as passed', (done) => {
                instance.waitUrl('testUrl')
                    .then((url) => {
                        url.should.equal('testUrl');
                        done();
                    });
            });

            it('should reject if window closed', (done) => {
                windowBrowserInstance.closed = true;
                instance.waitUrl('testUrl')
                    .catch((error) => {
                        expect(error).to.be.an.instanceof(Error);
                        done();
                    });
            });
        });
    });

});
