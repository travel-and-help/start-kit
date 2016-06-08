import React from 'react';
import Header from '../../../../common/components/header/header';
import CompleteForm from './CompleteForm';

const CompleteChallenge = () => (
    <section className="challenge-complete">
        <form >
            <Header title="Challenge completed">
                <button className="header__action"
                  type="button"
                >Submit</button>
            </Header>
            <CompleteForm />
        </form>
    </section>
);

CompleteChallenge.propTypes = {};

export default CompleteChallenge;
