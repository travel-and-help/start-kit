import React from 'react';
import ChallengeNav from './ChallengeNav';
import ChallengeDetails from './ChallengeDetails';
import ChallengeComments from './ChallengeComments';

const challengesData = [
    {
        id: 0,
        name: '1',
        image: '0.png',
        author: 'Anton',
        level: 'hard'
    },
    {
        id: 1,
        name: '2',
        image: '0.png',
        author: 'Igor',
        level: 'easy'
    }
];

//const getChallenge = ({challenges, id}) => (
//    challenges.filter(
//        challenge => challenge.id === id
//    )
//);

const { Component } = React;

class Challenge extends Component {
    render() {
        const id = this.props.params.id;

        return (
            <div>
                <ChallengeNav />
                <ChallengeDetails challenge={challengesData[id]} />
                <ChallengeComments />
            </div>
        );
    }
}

export default Challenge;
