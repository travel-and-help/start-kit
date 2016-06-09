import React, { Component, PropTypes } from 'react';

const cameraError = (message) => {
    console.log(`Failed because: ${message}`);
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
        this.createInput.value = imageData;
        this.setState({
            inlineStyle: {
                background: `url(data:image;base64,${imageData})`,
                backgroundSize: 'cover'
            }
        });
    }

    render() {
        const { inlineStyle } = this.state;
        const { image } = this.props;
        return (
            <div className={image.error && image.touched ?
                'create-photo create-photo_error' :
                'create-photo'}
                 style={ inlineStyle }
                 onClick={ this.onClick }
            >
                <input hidden
                    {...image}
                    ref={(ref) => { this.createInput = ref; }}
                />
            </div>
        );
    }
}

CreatePhoto.propTypes = {
    image: PropTypes.object
};

export default CreatePhoto;
