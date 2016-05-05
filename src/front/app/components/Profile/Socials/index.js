import React from 'react';
import Social from './Social';

export default class Socials extends React.Component {
    render() {

        const socials = [
            {
                name: 'twitter',
                url: '#twitter'
            },
            {
                name: 'facebook',
                url: '#facebook'
            },
            {
                name: 'linkedIn',
                url: '#linkedIn'
            },
            {
                name: 'googlePlus',
                url: '#googlePlus'
            }
        ];
        return (
            <ul className='section-container__social' >
                { socials && socials.map((social, index) => (
                    <Social key={ index } { ...social }/>
                ))}
            </ul>
        );
    }
}
