import React from 'react';
import { Router } from 'react-router';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const user = {
            rating: 9.5,
            categories: 'Children, Obesity, HIV',
            locations: 'Ukraine, USA, UK',
            photo: 'http://placehold.it/124x120',
            name: 'ANTON SHNAIDER',
            created: 0,
            accepted: 0,
            completed: 0,
            registerDate: '10 april 2012',
            lastLogin: '23 March 2016'
        };
        return (
            <div className="profile" >
                <nav className='nav' >
                    {/* goBack icon
                     <a className='nav__item nav__item--left' href='#'>
                     <i className='sprite sprite-arrow-left'></i>
                     </a>
                     */}
                    <a className='nav__item nav__item--right' href='#' >
                        <i className='sprite sprite-options' ></i>
                    </a>
                </nav>

                <section className='user' >

                    <ul className='user__info' >
                        <li className='user__info__item' >
                            <span className='sprite sprite-todo' ></span>
                        </li>
                        <li className='user__info__item' >
                            <img className='user__image' src={user.photo} title={user.name} />
                        </li>
                        <li className='user__info__item user__info__item--rate' >
                            <span className='sprite sprite-rate' >{user.rating}</span>
                        </li>
                    </ul>

                    <div className='user__name' >
                        <h2>{user.name}</h2>
                    </div>

                    <ul className='user__status' >
                        <li className='user__status__item' >
                            <div className='user__status__item__value' >{user.created}</div>
                            <div className='user__status__item__title' >created</div>
                        </li>
                        <li className='user__status__item' >
                            <div className='user__status__item__value' >{user.accepted}</div>
                            <div className='user__status__item__title' >accepted</div>
                        </li>
                        <li className='user__status__item' >
                            <div className='user__status__item__value' >{user.completed}</div>
                            <div className='user__status__item__title' >completed</div>
                        </li>
                        <li className='user__status__item' >
                            <div className='user__status__item__value' >
                                <a href='#' >
                                    <span className='sprite sprite-follow' ></span>
                                </a>
                            </div>
                            <div className='user__status__item__title' >follow</div>
                        </li>
                    </ul>
                </section>

                <section className='section-container' >
                    <h4 className='section-container__title' >LOCATIONS</h4>
                    <div className='section-container__description' >{user.locations}</div>
                </section>

                <section className='section-container' >
                    <h4 className='section-container__title' >CATEGORIES</h4>
                    <div className='section-container__description' >{user.categories}</div>
                </section>

                <section className='section-container section-container--inline' >
                    <h4 className='section-container__title' >ON WEB</h4>
                    <div className='section-container__description' >
                        <ul className='section-container__social' >
                            <li>
                                <a href='#' >
                                    <span className='sprite sprite-twitter' ></span>
                                </a>
                            </li>
                            <li>
                                <a href='#' >
                                    <span className='sprite sprite-fb' ></span>
                                </a>
                            </li>
                            <li>
                                <a href='#' >
                                    <span className='sprite sprite-linkedIn' ></span>
                                </a>
                            </li>
                            <li>
                                <a href='#' >
                                    <span className='sprite sprite-gp' ></span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </section>

                <section className='section-container' >
                    <div className='section-container__description' >
                        <p>
                            Member since {user.registerDate}
                        </p>
                        <p>
                            Last login {user.lastLogin}
                        </p>
                    </div>
                </section>

            </div>
        );
    }
};
