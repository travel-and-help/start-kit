import React from 'react';
import Social from './Social';
import Fasteners from '../../../../../common/components/fasteners/Fasteners';

const Socials = ({ list = [] }) => (
    <div className="socials" >
        <Fasteners className="challenge-tile-wrap__fasteners" />
        <div className="socials__info" >
            <div className="socials__title" >On Web</div>
            <div className="socials__list" >
                {list.map((social, key) => (
                    <Social { ...social } key={ key } />
                ))}
            </div>
        </div>
    </div>
);

Socials.propTypes = {
    list: React.PropTypes.array
};

export default Socials;
