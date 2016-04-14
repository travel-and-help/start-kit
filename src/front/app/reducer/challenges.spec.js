import challengesReducer from './challenges';

describe('reducer/challenges', () => {

    const INITIAL_CHALLENGES = [
        {
            category: 'Charity',
            description: 'Pokormi Bomzha',
            location: 'Pechersk',
            user: {
                firstName: 'Anton',
                lastName: 'Golubev',
                rating: 9
            }
        },
        {
            category: 'Test Category 1',
            description: 'Test Desc 1',
            location: 'Test Loc 1',
            user: {
                firstName: 'First 1',
                lastName: 'Last 1',
                rating: 1
            }
        },
        {
            category: 'Test Category 2',
            description: 'Test Desc 2',
            location: 'Test Loc 2',
            user: {
                firstName: 'First 2',
                lastName: 'Last 2',
                rating: 2
            }
        },
        {
            category: 'Test Category 3',
            description: 'Test Desc 3',
            location: 'Test Loc 3',
            user: {
                firstName: 'First 3',
                lastName: 'Last 3',
                rating: 3
            }
        }
    ];

    let sut;


    it('should NOT change state if action.type is UNKNOWN', () => {
        const action = {type: 'unknownType'};
        sut = challengesReducer({}, action);
        sut.should.eqls({});
    });

    it('should add initial challenges to state', () => {
        const action = {type: 'GET_INITIAL_CHALLENGES'};
        sut = challengesReducer(undefined, action);
        sut.should.eqls(INITIAL_CHALLENGES);
    });

});
