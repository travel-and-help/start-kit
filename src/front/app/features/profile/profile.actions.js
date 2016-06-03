export const GET_USER = 'GET_USER';

export function getUser() {
    return function fetchUser(dispatch) {

        //  fetch('/api/user')
        //    .then(response => response.json())
        //    .then((user) => {
        dispatch({
            type: GET_USER,
            user: {
                _id: '5729c5b0a5cea55c0ec86180',
                photo: 'https://dl.dropboxusercontent.com/u/18882037/challenge/random/p10.jpg',
                registerDate: 1462355376059,
                lastLogin: 1462355376059,
                wishList: [],
                challenges: [
                    {
                        status: 'accepted',
                        challenge: '57221b865604d7a415be6a5e'
                    }
                ],
                location: 'Pechersk',
                firstName: 'Anton',
                lastName: 'Golubev',
                rating: 9
            }
        });
        //  });

    };
}
