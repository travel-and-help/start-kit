import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

const click = ({
    challenge,
    dispatch
}) => {
    //console.log(challenge, 'clicked');

    return (
        dispatch({type: 'PASS_CHALLENGE', challenge})
        //console.log(dispatch, 'clicked')
    );
};
class TopChallenge extends Component {

    render() {
        const { challenge, dispatch } = this.props;
        //console.log(dispatch);

//const TopChallenge = (challenge, dispatch) => (
        return (
        <li className="topChallenge">
            <Link to={'challenge/' + challenge._id} onClick={click.bind(this, {challenge, dispatch})}>
                <div className="topChallenge__caption">
                    <p className="topChallenge__title">
                    {challenge.title}
                    </p>
                    <span className="topChallenge__popular">
                        Popular this week
                    </span>
                </div>
            </Link>
        </li>
        );
    }
//);
}

TopChallenge.propTypes = {
    //title: React.PropTypes.string.isRequired,
    //_id: React.PropTypes.string.isRequired
    challenge: React.PropTypes.object,
    dispatch: React.PropTypes.func
};

export default TopChallenge;
