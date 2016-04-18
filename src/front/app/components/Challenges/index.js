import React from 'react';
import ChallengeList from './ChallengeList';
import Menu from './Menu';
import Navigation from './../Navigation';

class Challenges extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: false
        };
    }

    scrollHandler(e) {
        e.preventDefault();
        if (e.target.scrollTop > 52) {
            this.setState({ isActive: true });
        } else {
            this.setState({ isActive: false });
        }
    }

    render() {
        const scrollHandler = this.scrollHandler.bind(this);

        return (
            <div className="challenges" onScroll={ scrollHandler }>
                <Menu active={ this.state.isActive } />
                <ChallengeList />
                <Navigation />
            </div>
        );
    }

}

export default Challenges;
