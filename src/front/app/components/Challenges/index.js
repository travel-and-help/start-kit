import React from 'react';
import ChallengeList from './ChallengeList';
import Menu from './Menu';
import Navigation from './../Navigation';

class Challenges extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isMenuActive: false
        };
        this.onScroll = this.onScroll.bind(this);
    }

    onScroll(e) {
        e.preventDefault();
        if (e.target.scrollTop) {
            this.setState({ isMenuActive: true });
        } else {
            this.setState({ isMenuActive: false });
        }
    }

    render() {
        const { isMenuActive } = this.state;

        return (
            <div className="challenges" onScroll={ this.onScroll }>
                <Menu active={ isMenuActive } />
                <ChallengeList />
                <Navigation />
            </div>
        );
    }

}

export default Challenges;
