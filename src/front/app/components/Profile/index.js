import React from 'react';

export default () => (
    <div>
        <nav className='nav'>
            <a className='nav__item nav__item--left' href='#'>
                <i className='sprite sprite-arrow-left'></i>
            </a>
            <a className='nav__item nav__item--right' href='#'>
                <i className='sprite sprite-options'></i>
            </a>
        </nav>

        <section className='user'>

            <ul className='user__info'>
                <li className='user__info__item'>
                    <span className='sprite sprite-todo'></span>
                </li>
                <li className='user__info__item'>
                    <img className='user__image' src='http://placehold.it/124x120' title='ANTON SHNAIDER'/>
                </li>
                <li className='user__info__item user__info__item--rate'>
                    <span className='sprite sprite-rate'>9,5</span>
                </li>
            </ul>

            <div className='user__name'>
                <h2>ANTON SHNAIDER</h2>
            </div>

            <ul className='user__status'>
                <li className='user__status__item'>
                    <div className='user__status__item__value'>4</div>
                    <div className='user__status__item__title'>created</div>
                </li>
                <li className='user__status__item'>
                    <div className='user__status__item__value'>6</div>
                    <div className='user__status__item__title'>accepted</div>
                </li>
                <li className='user__status__item'>
                    <div className='user__status__item__value'>2</div>
                    <div className='user__status__item__title'>completed</div>
                </li>
                <li className='user__status__item'>
                    <div className='user__status__item__value'>
                        <a href='#'>
                            <span className='sprite sprite-follow'></span>
                        </a>
                    </div>
                    <div className='user__status__item__title'>follow</div>
                </li>
            </ul>
        </section>
    </div>
);
