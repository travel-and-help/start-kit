const proxyquire = require('proxyquire').noCallThru();

const chai = require('chai'),
    expect = chai.expect;

describe('app/common/in-app-browser/cordova-browser-wrapper', () => {
    let Sut,
        inAppBrowser,
        inAppBrowserInstance;

    beforeEach(() => {
        inAppBrowserInstance = {
            close: env.stub(),
            executeScript: env.spy((config, callback) => {
                if (config.code === 'document.URL') {
                    callback('testUrl');
                }
                if (config.code === 'document.body.innerHTML') {
                    callback('testBody');
                }
            }),
            addEventListener: env.spy((config, callback) => {
                callback();
            }),
            removeEventListener: env.stub()
        };
        inAppBrowser = {
            open: env.stub().returns(inAppBrowserInstance)
        };
        global.window.cordova = { InAppBrowser: inAppBrowser };
        Sut = proxyquire('./cordova-browser-wrapper', {}).default;
    });

    describe('instance', () => {
        let instance;

        beforeEach(() => {
            instance = new Sut('testUrl', 'testTarget', 'testConfig');
        });

        it('should open window on create', () => {
            inAppBrowser.open.should.calledWith('testUrl', 'testTarget', 'testConfig');
            expect(instance).to.be.an.instanceof(Sut);
        });

        describe('getGetWindow method', () => {

            it('should return browser instance', () => {
                instance.getGetWindow().should.equal(inAppBrowserInstance);
            });

        });

        describe('close method', () => {

            it('should close browser', () => {
                instance.close();
                inAppBrowserInstance.close.should.calledWith();
            });

        });

        describe('getUrl method', () => {

            it('should return promise', () => {
                expect(instance.getUrl()).to.be.an.instanceof(Promise);
            });

            it('should resolve with browser url', (done) => {
                instance.getUrl()
                    .then((url) => {
                        url.should.equal('testUrl');
                        done();
                    });
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

        });
    });

});
