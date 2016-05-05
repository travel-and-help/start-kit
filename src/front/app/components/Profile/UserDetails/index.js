import React from 'react';
import Stats from './Stats';

export default class UserDetails extends React.Component {
    render() {
        const { name } = this.props.user;
        const { photo } = this.props.user;
        const { rating } = this.props.user;
        const { stats } = this.props.user;

        return (
            <section className='user' >
                <ul className='user__info' >
                    <li className='user__info__item' >
                        <span className='sprite sprite-todo' ></span>
                    </li>
                    <li className='user__info__item' >
                        <img className='user__image' src={photo} title={name} />
                    </li>
                    <li className='user__info__item user__info__item--rate' >
                        <span className='sprite sprite-rate' >{rating}</span>
                    </li>
                </ul>

                <h2 className='user__name' >{name}</h2>

                <Stats stats={stats} />
            </section>
        );
    }
}
