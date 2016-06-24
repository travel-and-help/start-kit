import React from 'react';

export default function loadable(Component) {
    return class LoadableWrap extends React.Component {
        static get propTypes() {
            return {
                ...Component.propTypes,
                onLoad: React.PropTypes.func.isRequired
            };
        }

        constructor(props) {
            super(props);
            props.onLoad();
        }

        render() {
            return (
                <Component {...this.props} />
            );
        }
    };
}
