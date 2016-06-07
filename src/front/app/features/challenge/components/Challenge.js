import React, { PropTypes, Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ChallengeDetailsMenu from './ChallengeDetailsMenu';
import ChallengeDetails from './ChallengeDetails';
import ChallengeComments from './ChallengeComments';
import Layout from '../../Layout';

const headerHeight = 250;
const menuHeight = 69;

class Challenge extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menu: {
                isBgVisible: false,
                bgImage: '',
                title: ''
            }
        };
    }

    componentDidMount() {
        const {
            getChallenge,
            getUser,
            userId,
            getAcceptedChallenges,
            getWishList } = this.props;
        const { id } = this.props.params;

        getChallenge(id);
        if (userId) {
            getUser(userId);
            getAcceptedChallenges(userId);
            getWishList(userId);
        }
    }

    componentWillUnmount() {
        this.props.getInitialState();
    }

    onScroll(e) {
        const scrollTop = e.target.scrollTop;
        const spaceForMenu = headerHeight - scrollTop;

        this.setState({
            menu: {
                isBgVisible: spaceForMenu <= menuHeight,
                bgImage: this.props.challenge.get('image'),
                title: this.props.challenge.get('title')
            }
        });
    }

    render() {

        const { challenge, onWatchChallenge, onAccept } = this.props;
        if (challenge.size) {
            return (
                <Layout
                    menu={<ChallengeDetailsMenu
                        {...Object.assign(this.state.menu, {
                            onWatchChallenge: () => onWatchChallenge(challenge.get('_id')),
                            isWatched: challenge.get('isWatched')
                        })}
                    />}
                    onScroll={e => this.onScroll(e)}
                >
                    <div className="challenge-details" >
                        <ChallengeDetails
                            challenge={challenge}
                            onAccept={onAccept}
                        />
                        <ChallengeComments />
                    </div>
                </Layout>
            );
        }
        return null;
    }
}

Challenge.propTypes = {
    challenge: ImmutablePropTypes.map.isRequired,
    user: ImmutablePropTypes.map,
    getUser: PropTypes.func.isRequired,
    userId: PropTypes.string,
    getChallenge: PropTypes.func.isRequired,
    getAcceptedChallenges: PropTypes.func.isRequired,
    getWishList: PropTypes.func.isRequired,
    userReceived: PropTypes.func.isRequired,
    params: PropTypes.object,
    onWatchChallenge: PropTypes.func.isRequired,
    onAccept: PropTypes.func.isRequired,
    getInitialState: PropTypes.func.isRequired
};

export default Challenge;
