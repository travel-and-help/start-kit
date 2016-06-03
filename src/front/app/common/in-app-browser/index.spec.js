const proxyquire = require('proxyquire').noCallThru();

describe('app/common/in-app-browser/index', () => {
    let sut,
        cordovaBrowserWrapper,
        windowBrowserWrapper;

    beforeEach(() => {
        cordovaBrowserWrapper = env.spy(() => ({ type: 'cordova' }));
        windowBrowserWrapper = env.spy(() => ({ type: 'window' }));
        sut = proxyquire('./index', {
            './CordovaBrowserWrapper': cordovaBrowserWrapper,
            './WindowBrowserWrapper': windowBrowserWrapper
        });
        global.window.cordova = null;
    });

    it('should return cordova wrapper if cordova supported', () => {
        global.window.cordova = {
            InAppBrowser: 'InAppBrowser'
        };
        sut.open('test').type.should.equal('cordova');
        cordovaBrowserWrapper.should.calledWith('test');
    });

    it('should return window wrapper if cordova do not supported', () => {
        sut.open('test').type.should.equal('window');
        windowBrowserWrapper.should.calledWith('test');
    });

});
