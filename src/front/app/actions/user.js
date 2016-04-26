export const GET_USER = 'GET_USER';

function receiveUser(challenges) {
    return {
        type: GET_USER,
        challenges
    };
}

export function getUser() {
    return function (dispatch) {
        fetch('/api/user')
            .then(response => response.json())
            .then((user) => {
                user = user || {
                        rating: 9.5,
                        categories: 'Children, Obesity, HIV',
                        locations: 'Ukraine, USA, UK',
                        photo: 'http://placehold.it/124x120',
                        name: 'ANTON SHNAIDER',
                        registerDate: '10 april 2012',
                        lastLogin: '23 March 2016',
                        socials: [
                            {
                                name: 'twitter',
                                url: '#twitter'
                            },
                            {
                                name: 'facebook',
                                url: '#facebook'
                            },
                            {
                                name: 'linkedIn',
                                url: '#linkedIn'
                            },
                            {
                                name: 'googlePlus',
                                url: '#googlePlus'
                            }
                        ],
                        stats: [
                            {
                                title: 'created',
                                value: 0
                            },
                            {
                                title: 'accepted',
                                value: 0
                            },
                            {
                                title: 'completed',
                                value: 0
                            },
                            {
                                title: 'follow',
                                value: 0,
                                icon: 'sprite-follow'
                            }
                        ]
                    };
                dispatch(receiveUser(user));
            });
    };
}
