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
        const props = this.props;
        const id = props.params.id;

        props.getChallenge(id);
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

        if (this.props.challenge.size) {
            return (
                <Layout
                    menu={<ChallengeDetailsMenu {...this.state.menu} />}
                    onScroll={ e => this.onScroll(e)}
                >
                    <div className="challenge-details" >
                        <ChallengeDetails challenge={this.props.challenge} />
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
    getChallenge: PropTypes.func.isRequired,
    getInitialState: PropTypes.func.isRequired
};

export default Challenge;
