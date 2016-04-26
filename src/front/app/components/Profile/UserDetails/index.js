import React from 'react';
import Stats from './Stats';

export default class UserDetails extends React.Component {
    render() {
        const { name } = this.props.user;
        const { photo } = this.props.user;
        const { rating } = this.props.user;
        const { stats } = this.props.user;

        return (
            <section class='user' >
                <ul class='user__info' >
                    <li class='user__info__item' >
                        <span class='sprite sprite-todo' ></span>
                    </li>
                    <li class='user__info__item' >
                        <img class='user__image' src={photo} title={name} />
                    </li>
                    <li class='user__info__item user__info__item--rate' >
                        <span class='sprite sprite-rate' >{rating}</span>
                    </li>
                </ul>

                <h2 class='user__name' >{name}</h2>

                <Stats stats={stats} />
            </section>
        );
    }
}
