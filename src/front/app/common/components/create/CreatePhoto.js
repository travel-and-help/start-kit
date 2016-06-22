import React, { Component, PropTypes } from 'react';

const cameraError = (/* message */) => {
    // TODO camera Error handling
};

class CreatePhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inlineStyle: {}
        };
        this.cameraSuccess = this.cameraSuccess.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        if (!navigator.camera || !navigator.camera.getPicture) return;
        navigator.camera.getPicture(this.cameraSuccess, cameraError, {
            destinationType: navigator.camera.DestinationType.DATA_URL,
            sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
        });
    }

    cameraSuccess(imageData) {
        const input = this.createInput;
        input.value = imageData;
        const event = new Event('input', {
            bubbles: true
        });
        input.dispatchEvent(event);
        this.setState({
            inlineStyle: {
                background: `url(data:image;base64,${imageData})`,
                backgroundSize: 'cover'
            }
        });
    }

    render() {
        const { inlineStyle } = this.state;
        const { onChange, error, touched, ...rest } = this.props;
        return (
            <input className={error && touched ?
                'create-photo create-photo_error' :
                'create-photo'}
                   type="text"
                   ref={(ref) => { this.createInput = ref; }}
                   style={ inlineStyle }
                   {...rest}
                   onClick= { this.onClick }
                   onChange={ onChange }
            />
        );
    }
}

CreatePhoto.propTypes = {
    onChange: PropTypes.func,
    error: PropTypes.bool,
    touched: PropTypes.bool
};

export default CreatePhoto;
