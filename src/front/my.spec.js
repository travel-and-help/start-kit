import { foo, bar, fooBar } from './my';

describe('my test', () => {

    describe('foo', () => {
        it('should return 1', () => {
            foo().should.equal(1);
        });

        it('should return param when passing param', () => {
            const a = Math.random();
            foo(a).should.equal(a);
        });
    });

    describe('bar', () => {
        it('should call passed fn with bar', () => {
            const cb = env.stub();
            bar(cb);
            cb.should.been.calledWith('bar');
        });
    });

    describe('fooBar', () => {

        let obj,
            result;

        beforeEach(() => {
            obj = {
                my: 'my'
            };
            deepFreeze(obj);
            result = fooBar(obj);
        });

        it('should return object with original properties', () => {
            result.should.include(obj);
        });

        it('should return object with foo property', () => {
            result.foo.should.equal('foo');
        });

        it('should return object with bar property', () => {
            result.bar.should.equal('bar');
        });

    });

});
