import React from 'react';
import Navigation from './../Navigation';

export default class Layout extends React.Component {
    render() {
        return (
            <div className="app">
                <main>
                    {this.props.children}
                </main>
                <Navigation />
            </div>
        );
    }
}
