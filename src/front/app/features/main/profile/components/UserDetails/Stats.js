import React from 'react';
import Stat from './Stat';
import ImmutablePropTypes from 'react-immutable-proptypes';

const Stats = ({ stats }) => (
  <ul className="user__stats" >
      { stats && stats.map((stat, index) => (
          <Stat key={ index } { ...stat } />
      ))}
  </ul>
);

Stats.propTypes = {
    stats: ImmutablePropTypes.list.isRequired
};

export default Stats;
