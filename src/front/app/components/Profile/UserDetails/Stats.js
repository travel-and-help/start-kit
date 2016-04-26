import React from 'react';
import Stat from './Stat';

export default class Stats extends React.Component {
    render() {
        const { stats } = this.props;

        return (
            <ul class='user__stats' >
                { stats.map((stat, index) => (
                    <Stat key={ index } { ...stat } />
                ))}
            </ul>
        );
    }
}
