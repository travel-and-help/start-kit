import appReducer from './app';

describe('reducer/app', () => {

    let sut;

    beforeEach(() => {
        sut = appReducer();
    });

    it('should be empty object', () => {
        sut.should.eqls({});
    });

});
