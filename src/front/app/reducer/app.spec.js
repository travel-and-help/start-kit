import challenges from './challenges';
import proxyquire from 'proxyquire';

describe('reducer/app', () => {

    let sut, combineReducers;

    beforeEach(() => {
        combineReducers = env.stub();

        sut = proxyquire('./app', {
            'redux': {
                combineReducers
            }
        }).default;

    });

    it('should combine reducers', () => {
        combineReducers.should.been.calledWith({challenges});
    });

});
