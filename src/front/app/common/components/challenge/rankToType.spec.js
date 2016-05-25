import sut from './rankToType';

describe('app/common/components/rankToType', () => {

    it('rank lower than 3 should be bad', () => {
        sut(3).should.equal('bad');
    });

    it('rank lower than 6 should be middle', () => {
        sut(6).should.equal('middle');
    });

    it('rank higher than 6 should be good', () => {
        sut(7).should.equal('good');
    });

});
