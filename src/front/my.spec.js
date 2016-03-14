import { foo } from './my';

describe('my test', () => {

    it('should return 1', () => {
        foo().should.equal(1);
    });

    it('should return param when passing param', () => {
        const a = Math.random();
        foo(a).should.equal(a);
    });

});
