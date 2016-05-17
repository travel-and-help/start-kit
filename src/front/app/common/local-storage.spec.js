const proxyquire = require('proxyquire').noCallThru();
const chai = require('chai'),
    expect = chai.expect;

describe('local-storage', () => {
    let sut,
        localStorage;

    beforeEach(() => {
        localStorage = {
            setItem: env.stub(),
            removeItem: env.stub(),
            getItem: env.stub(),
            clear: env.stub()
        };
        sut = proxyquire('./local-storage', {});
    });

    it('should throw if not supported', () => {
        expect(() => {
            sut.get('testItem');
        }).to.throw(Error);
    });

    describe('local storade supported', () => {

        beforeEach(() => {
            global.window.localStorage = localStorage;
        });

        describe('set method', () => {

            it('should set value to local storage', () => {
                sut.set('testName', 'TestValue');
                localStorage.setItem.should.calledWith('testName', '"TestValue"');
            });

            it('should remove if value not passed', () => {
                sut.set('testName');
                localStorage.removeItem.should.calledWith('testName');
            });

        });

        describe('get value', () => {

            it('should return value', () => {
                localStorage.getItem.returns('"TestValue"');
                sut.get('testName', 'testDefault').should.equal('TestValue');
                localStorage.getItem.should.calledWith('testName');
            });

            it('should return default value if wasn\'t set', () => {
                sut.get('testName', 'testDefault').should.equal('testDefault');
                localStorage.getItem.should.calledWith('testName');
            });

            it('should return value if can\'t be parsed', () => {
                localStorage.getItem.returns('TestValue');
                sut.get('testName', 'testDefault').should.equal('TestValue');
            });
        });

        describe('has method', () => {

            it('should return if has value', () => {
                localStorage.getItem.returns('"TestValue"');
                sut.has('testName').should.equal(true);
                localStorage.getItem.should.calledWith('testName');
            });

        });

        describe('remove method', () => {

            it('should remove value', () => {
                sut.remove('testName');
                localStorage.removeItem.should.calledWith('testName');
            });

        });
        describe('clear method', () => {

            it('should clear all values', () => {
                sut.clear();
                localStorage.clear.should.calledWith();
            });

        });
    });

});
