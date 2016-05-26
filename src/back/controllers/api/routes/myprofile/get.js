'use strict';

const get = (req, res) => {
    res.json({
        _id: '5729c5b0a5cea55c0ec86180',
        photo: 'https://dl.dropboxusercontent.com/u/18882037/challenge/random/p10.jpg',
        registerDate: 1462355376059,
        lastLogin: 1462355376059,
        web: [
            {
                title: 'facebook',
                link: 'https://www.facebook.com/'
            },
            {
                title: 'twitter',
                link: 'https://twitter.com/'
            },
            {
                title: 'instagram',
                link: 'https://www.instagram.com/'
            },
            {
                title: 'googlePlus',
                link: 'https://plus.google.com/'
            }
        ],
        wishList: [],
        categories: ['Children', 'Animals'],
        challenges: [
            {
                status: 'accepted',
                challenge: {
                    _id: '57404151d9b7ace0076f6a39',
                    categories: ['Social'],
                    title: 'Poveseli Bomzha',
                    image: 'https://dl.dropboxusercontent.com/u/18882037/challenge/random/p18.jpg',
                    level: 'easy',
                    location: 'Obolon',
                    user: {
                        firstName: 'Alex',
                        lastName: 'Torsk',
                        rating: 3
                    },
                    description: 'Lorem ipsum dolor sit amet'
                }
            },
            {
                status: 'accepted',
                challenge: {
                    _id: '57404151d9b7ace0076f6a39',
                    categories: ['Social'],
                    title: 'Poveseli Bomzha',
                    image: 'https://dl.dropboxusercontent.com/u/18882037/challenge/random/p18.jpg',
                    level: 'easy',
                    location: 'Obolon',
                    user: {
                        firstName: 'Alex',
                        lastName: 'Torsk',
                        rating: 3
                    },
                    description: 'Lorem ipsum dolor sit amet'
                }
            },
            {
                status: 'created',
                challenge: {
                    _id: '57404151d9b7ace0076f6a39',
                    categories: ['Social'],
                    title: 'Poveseli Bomzha',
                    image: 'https://dl.dropboxusercontent.com/u/18882037/challenge/random/p18.jpg',
                    level: 'easy',
                    location: 'Obolon',
                    user: {
                        firstName: 'Alex',
                        lastName: 'Torsk',
                        rating: 3
                    },
                    description: 'Lorem ipsum dolor sit amet'
                }
            },
            {
                status: 'completed',
                challenge: {
                    _id: '57404151d9b7ace0076f6a39',
                    categories: ['Social'],
                    title: 'Poveseli Bomzha',
                    image: 'https://dl.dropboxusercontent.com/u/18882037/challenge/random/p18.jpg',
                    level: 'easy',
                    location: 'Obolon',
                    user: {
                        firstName: 'Alex',
                        lastName: 'Torsk',
                        rating: 3
                    },
                    description: 'Lorem ipsum dolor sit amet'
                }
            },
            {
                status: 'completed',
                challenge: {
                    _id: '57404151d9b7ace0076f6a39',
                    categories: ['Social'],
                    title: 'Poveseli Bomzha',
                    image: 'https://dl.dropboxusercontent.com/u/18882037/challenge/random/p18.jpg',
                    level: 'easy',
                    location: 'Obolon',
                    user: {
                        firstName: 'Alex',
                        lastName: 'Torsk',
                        rating: 3
                    },
                    description: 'Lorem ipsum dolor sit amet'
                }
            }
        ],
        locations: ['Kiev', 'Odessa'],
        firstName: 'Anton',
        lastName: 'Golubev',
        rating: 9
    });
};

module.exports = get;
